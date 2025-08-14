'use client';

import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ChangeNameModal from '../modals/ChangeNameModal';
import { fetchUser, updateUserProfile } from '@/lib/contexts/UseUserContext';
import dynamic from 'next/dynamic';
import { uploadFile } from '@/lib/contexts/UploadContext'; // upload helper

// Load the modal without SSR because Leaflet needs the browser
const LocationPickerModal = dynamic(() => import('../map/LocationPicker'), { ssr: false });

type Socials = {
  website: string;
  instagram: string;
  x: string;        // map to your backend enum
  youtube: string;
  linkedin: string;
  facebook: string;
};

type ProfileState = {
  firstName: string;
  lastName: string;
  bio: string;
  location: {
    latitude: string;
    locationName: string;
    longitude: string;
  };
  username: string;
  url: string;
  socials: Socials;
  // add picture fields so UI can reflect upload immediately
  profilePictureUrl: string;
  thumbnailUrl: string;
};

const SOCIAL_ENUM: Record<keyof Socials, string> = {
  website: 'WEBSITE',
  instagram: 'INSTAGRAM',
  x: 'TWITTER',       // change to 'X' if your schema expects it
  youtube: 'YOUTUBE',
  linkedin: 'LINKEDIN',
  facebook: 'FACEBOOK',
};

const isNonEmpty = (v?: string) => typeof v === 'string' && v.trim().length > 0;

/* ==== Types that mirror your mutation variables (no `any`) ==== */
type SocialAction = 'ADD' | 'REMOVE' | 'UPDATE';

type SocialLinkOp = {
  social: string;
  link?: string;
  action: SocialAction;
};

type UpdateUserVars = {
  bio?: string;
  displayName?: string;
  dob?: string;
  firstName?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  hideFromSearchEngines?: boolean;
  lastName?: string;
  otp?: string;
  // Location expected as strings
  location?: {
    latitude?: string;
    longitude?: string;
    locationName?: string;
  };
  phoneNumber?: { countryCode: string; number: string };
  profilePicture?: { profilePictureUrl: string; thumbnailUrl: string };
  socialLinks?: { links: SocialLinkOp[] };
  username?: string;
};

/** Build GraphQL variables that include ONLY changed fields */
function diffToVars(prev: ProfileState, next: ProfileState): Partial<UpdateUserVars> {
  const vars: Partial<UpdateUserVars> = {};

  if (prev.bio !== next.bio) {
    vars.bio = next.bio ?? '';
  }

  // Update LOCATION (as strings)
  const locationChanged =
    prev.location.locationName !== next.location.locationName ||
    prev.location.latitude !== next.location.latitude ||
    prev.location.longitude !== next.location.longitude;

  if (locationChanged) {
    const locOut: NonNullable<UpdateUserVars['location']> = {};
    if (next.location.locationName !== undefined) locOut.locationName = next.location.locationName ?? '';
    if (next.location.latitude !== undefined) locOut.latitude = next.location.latitude ?? '';
    if (next.location.longitude !== undefined) locOut.longitude = next.location.longitude ?? '';
    vars.location = locOut;
  }

  if (prev.firstName !== next.firstName) vars.firstName = next.firstName ?? '';
  if (prev.lastName !== next.lastName) vars.lastName = next.lastName ?? '';

  // Social links: ADD / REMOVE / UPDATE
  const socialLinksOps: SocialLinkOp[] = [];
  (Object.keys(next.socials) as (keyof Socials)[]).forEach((key) => {
    const before = prev.socials[key] || '';
    const after = next.socials[key] || '';
    if (before === after) return;

    const social = SOCIAL_ENUM[key];

    if (!isNonEmpty(before) && isNonEmpty(after)) {
      // ADD
      socialLinksOps.push({ social, link: after, action: 'ADD' });
    } else if (isNonEmpty(before) && !isNonEmpty(after)) {
      // REMOVE
      socialLinksOps.push({ social, action: 'REMOVE' });
    } else if (isNonEmpty(before) && isNonEmpty(after) && before !== after) {
      // UPDATE
      socialLinksOps.push({ social, link: after, action: 'UPDATE' });
    }
  });

  if (socialLinksOps.length) {
    vars.socialLinks = { links: socialLinksOps };
  }

  return vars;
}

export default function Profile() {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imgVersion, setImgVersion] = useState(0); // cache-buster for the image

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // single state for all profile values
  const [profile, setProfile] = useState<ProfileState>({
    firstName: '',
    lastName: '',
    bio: '',
    location: {
      latitude: '',
      locationName: '',
      longitude: ''
    },
    username: '',
    url: '',
    socials: {
      website: '',
      instagram: '',
      x: '',
      youtube: '',
      linkedin: '',
      facebook: '',
    },
    profilePictureUrl: '',
    thumbnailUrl: '',
  });

  // UI-only states
  const [expandedSections, setExpandedSections] = useState({
    socialLinks: true,
    membershipVisibility: false,
    advanced: false,
  });
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [focusedSocialField, setFocusedSocialField] = useState<string | null>(null);

  // hydration + diff baseline
  const hydrated = useRef(false);
  const serverSnapRef = useRef<ProfileState | null>(null); // last known saved state

  // hydrate from server once
  useEffect(() => {
    (async () => {
      const res = await fetchUser();
      if (res.success && res.data) {
        const u = res.data;

        // Map server -> UI state
        const hydratedProfile: ProfileState = {
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          bio: u.bio || '',
          location: {
            locationName: u.location?.locationName || '',
            longitude: u.location?.longitude ?? '',
            latitude: u.location?.latitude ?? '',
          },
          username: u.username || '',
          url: u.username ? `skool.com/@${u.username}` : '',
          socials: {
            website: u.socialLinks.website || '',
            instagram: u.socialLinks.instagram || '',
            x: u.socialLinks.twitter || '',
            youtube: u.socialLinks.youtube || '',
            linkedin: u.socialLinks.linkedin || '',
            facebook: u.socialLinks.facebook || '',
          },
          profilePictureUrl: u.profilePictureUrl || '/head2.jpg', // fallback
          thumbnailUrl: u.thumbnailUrl || u.profilePictureUrl || '/head2.jpg',
        };

        setProfile(hydratedProfile);
        serverSnapRef.current = hydratedProfile; // establish diff baseline
        hydrated.current = true; // prevent immediate autosave right after hydration
      }
    })();
  }, []);

  // Debounced auto-save that ONLY sends changed fields
  useEffect(() => {
    if (!hydrated.current || !serverSnapRef.current) return;

    const timer = setTimeout(async () => {
      const prev = serverSnapRef.current!;
      const next = profile;

      const vars = diffToVars(prev, next);
      if (Object.keys(vars).length === 0) return; // nothing changed

      const result = await updateUserProfile(vars);
      if (result.success) {
        serverSnapRef.current = next; // advance baseline
      } else {
        console.error('Auto-save failed:', result.error);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [profile]);

  const handleNameSave = (newFirstName: string, newLastName: string) => {
    setProfile(prev => ({ ...prev, firstName: newFirstName, lastName: newLastName }));
    // Optional immediate save
    const prev = serverSnapRef.current ?? profile;
    const next: ProfileState = { ...prev, firstName: newFirstName, lastName: newLastName };
    const vars = diffToVars(prev, next);
    updateUserProfile(vars).then(res => {
      if (res.success) serverSnapRef.current = next;
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  /* ================== PROFILE PICTURE UPLOAD ================== */

  const openFilePicker = () => fileInputRef.current?.click();

const onFileSelected: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  console.log("file", file)

  try {
    setUploading(true);

    // 1) Upload (now normalizes extension and parses API array)
    const res = await uploadFile(file, "PROFILE_PICTURE");
   
    // if (!res.success || !res.url) {
    //   throw new Error(res.message || "Upload failed");
    // }

    // const fullUrl = res.url;
    const fullUrl =  res ?? "";

    // 2) Persist to user profile via mutation
    const save = await updateUserProfile({
      profilePicture: { profilePictureUrl: fullUrl, thumbnailUrl: fullUrl },
    });

    if (!save.success) {
      throw new Error(save.error || "Failed to update profile picture");
    }

    // 3) Reflect immediately in UI + cache-bust
    setProfile(prev => ({
      ...prev,
      profilePictureUrl: fullUrl,
      thumbnailUrl: fullUrl,
    }));
    setImgVersion(v => v + 1);

    if (serverSnapRef.current) {
      serverSnapRef.current = {
        ...serverSnapRef.current,
        profilePictureUrl: fullUrl,
        thumbnailUrl: fullUrl,
      };
    }
  } catch (err) {
    console.error(err);
    // optional: toast error message
  } finally {
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
};


  /* ======================= UI ======================= */

  const displayedSrc =
    (profile.profilePictureUrl ? `${profile.profilePictureUrl}?v=${imgVersion}` : '') || '/head2.jpg';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      {/* Profile Photo */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={displayedSrc}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center text-white text-xs">
              Uploading…
            </div>
          )}
        </div>

        {/* Hidden input for image file */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileSelected}
        />

        <button
          onClick={openFilePicker}
          disabled={uploading}
          className="text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : 'Change profile photo'}
        </button>
      </div>

      {/* Name Fields */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400">
              First Name
            </label>
            <input
              type="text"
              value={profile.firstName}
              readOnly
              className="w-full px-3 py-3 border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-gray-400 cursor-not-allowed pointer-events-none"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              value={profile.lastName}
              readOnly
              className="w-full px-3 py-3 border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-gray-400 cursor-not-allowed pointer-events-none"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">
          You can only change your name once, and you must use your real name{' '}
          <button
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setIsNameModalOpen(true)}
          >
            Change name.
          </button>
        </p>
      </div>

      {/* URL Field */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            URL
          </label>
          <input
            type="text"
            value={profile.url}
            readOnly
            className="w-full px-3 py-3 border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-gray-400 cursor-not-allowed pointer-events-none"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {" You can change your URL once you've got 90 contributions, 30 followers, and been using it for 90 days."}
        </p>
      </div>

      {/* Bio Field */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            Bio
          </label>
          <textarea
            value={profile.bio}
            onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            rows={3}
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 resize-none"
          />
        </div>
        <div className="text-right mt-1">
          <span className="text-sm text-gray-400">{`${profile.bio?.length ?? 0} / 150`}</span>
        </div>
      </div>

      {/* Location Field */}
      <div className="mb-8">
        <div className="relative">
          <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
            isLocationFocused ? 'opacity-100' : 'opacity-0'
          }`}>
            Location
          </label>
          <input
            type="text"
            placeholder={isLocationFocused ? '' : 'Location'}
            value={profile.location.locationName}
            onChange={e =>
              setProfile(prev => ({
                ...prev,
                location: {
                  ...prev.location,
                  locationName: e.target.value, // only update name
                },
              }))
            }
            onFocus={() => setIsLocationFocused(true)}
            onBlur={() => setIsLocationFocused(false)}
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-2">
          <button onClick={() => setIsMapOpen(true)} className="flex items-center gap-2 text-blue-600 text-sm hover:text-blue-700">
            <MapPin className="w-4 h-4" />
            Change my map location
          </button>
          <button
            className="text-gray-500 text-sm hover:text-gray-700"
            onClick={() =>
              setProfile(prev => ({
                ...prev,
                location: { latitude: '', longitude: '', locationName: '' },
              }))
            }
          >
            Remove my map location
          </button>
        </div>
      </div>

      {/* Myers Briggs */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 z-10">
            Myers Briggs
          </label>
          <div className="relative">
            <select className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 appearance-none bg-white">
              <option>{"Don't show"}</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="mb-4">
        <div
          className="flex items-center mb-4 gap-2 cursor-pointer transition-colors"
          onClick={() => toggleSection('socialLinks')}
        >
          <span className="font-medium text-gray-900 text-sm">Social links</span>
          {expandedSections.socialLinks ? (
            <ChevronUp className="w-4 h-4 text-gray-800" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-800" />
          )}
        </div>

        {expandedSections.socialLinks && (
          <div className=" border-t-0 rounded-b-lg space-y-4">
            {/* Website */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                focusedSocialField === 'website' ? 'opacity-100' : 'opacity-0'
              }`}>
                Website
              </label>
              <input
                type="text"
                placeholder={focusedSocialField === 'website' ? '' : 'Website'}
                value={profile.socials.website}
                onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, website: e.target.value } }))}
                onFocus={() => setFocusedSocialField('website')}
                onBlur={() => setFocusedSocialField(null)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Instagram */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                focusedSocialField === 'instagram' ? 'opacity-100' : 'opacity-0'
              }`}>
                Instagram
              </label>
              <input
                type="text"
                placeholder={focusedSocialField === 'instagram' ? '' : 'Instagram'}
                value={profile.socials.instagram}
                onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, instagram: e.target.value } }))}
                onFocus={() => setFocusedSocialField('instagram')}
                onBlur={() => setFocusedSocialField(null)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* X */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                focusedSocialField === 'x' ? 'opacity-100' : 'opacity-0'
              }`}>
                X
              </label>
              <input
                type="text"
                placeholder={focusedSocialField === 'x' ? '' : 'X'}
                value={profile.socials.x}
                onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, x: e.target.value } }))}
                onFocus={() => setFocusedSocialField('x')}
                onBlur={() => setFocusedSocialField(null)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* YouTube */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                focusedSocialField === 'youtube' ? 'opacity-100' : 'opacity-0'
              }`}>
                YouTube
              </label>
              <input
                type="text"
                placeholder={focusedSocialField === 'youtube' ? '' : 'YouTube'}
                value={profile.socials.youtube}
                onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, youtube: e.target.value } }))}
                onFocus={() => setFocusedSocialField('youtube')}
                onBlur={() => setFocusedSocialField(null)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* LinkedIn */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                focusedSocialField === 'linkedin' ? 'opacity-100' : 'opacity-0'
              }`}>
                LinkedIn
              </label>
              <input
                type="text"
                placeholder={focusedSocialField === 'linkedin' ? '' : 'LinkedIn'}
                value={profile.socials.linkedin}
                onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, linkedin: e.target.value } }))}
                onFocus={() => setFocusedSocialField('linkedin')}
                onBlur={() => setFocusedSocialField(null)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Facebook */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                focusedSocialField === 'facebook' ? 'opacity-100' : 'opacity-0'
              }`}>
                Facebook
              </label>
              <input
                type="text"
                placeholder={focusedSocialField === 'facebook' ? '' : 'Facebook'}
                value={profile.socials.facebook}
                onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, facebook: e.target.value } }))}
                onFocus={() => setFocusedSocialField('facebook')}
                onBlur={() => setFocusedSocialField(null)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>
        )}
      </div>

      {/* Membership Visibility Section */}
      <div className="mb-4">
        <div
          className="flex items-center mb-4 gap-2 transition-colors cursor-pointer"
          onClick={() => toggleSection('membershipVisibility')}
        >
          <span className="font-medium text-gray-900 text-sm">Membership visibility</span>
          {expandedSections.membershipVisibility ? (
            <ChevronUp className="w-4 h-4 text-gray-800" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-800" />
          )}
        </div>

        {expandedSections.membershipVisibility && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-4">
            <p className="text-sm text-gray-600 mb-4">Control what groups show on your profile.</p>

            <div className="space-y-4">
              {/* mock content */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AIS</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Automation Society</h4>
                    <p className="text-sm text-gray-500">Public • 109.2k members</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-green-600 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AAA</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Automation (A-Z)</h4>
                    <p className="text-sm text-gray-500">Private • 81.1k members</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-green-600 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Automation Agency Hub</h4>
                    <p className="text-sm text-gray-500">Private • 217.6k members</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-green-600 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Section */}
      <div className="mb-4">
        <div
          className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('advanced')}
        >
          <span className="font-medium text-gray-900 text-sm">Advanced</span>
          {expandedSections.advanced ? (
            <ChevronUp className="w-4 h-4 text-gray-800" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-800" />
          )}
        </div>

        {expandedSections.advanced && (
          <div className="border-t-0 rounded-b-lg ">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">Hide profile from search engines</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Name Modal */}
      <ChangeNameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSave={handleNameSave}
        currentFirstName={profile.firstName}
        currentLastName={profile.lastName}
      />

      {/* Location Modal */}
      <LocationPickerModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSave={(loc) => {
          setProfile(prev => ({
            ...prev,
            location: {
              ...prev.location,
              locationName: loc.address,
              latitude: loc.latitude.toString(),   // ensure string
              longitude: loc.longitude.toString(), // ensure string
            }
          }));
        }}
        nominatimEmail="you@example.com"
      />
    </div>
  );
}
