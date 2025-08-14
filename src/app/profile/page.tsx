'use client';

import Image from 'next/image';
import { ChevronDown, Settings } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchUser, User } from '@/lib/contexts/UseUserContext';
import Link from 'next/link';

type HeatCell = { level: 0 | 1 | 2 | 3 | 4 };
type Week = HeatCell[];
type Heatmap = Week[];

// Fake heatmap data to resemble the screenshot (lighter on the left, a few greens near the right)
function useFakeHeatmap(): Heatmap {
  return useMemo(() => {
    const weeks = 52;
    const rows = 4; // Mon, Wed, Fri, Sun (to match screenshot labels)
    const map: Heatmap = [];

    for (let w = 0; w < weeks; w++) {
      const week: Week = [];
      for (let r = 0; r < rows; r++) {
        // Mostly empty/light, then some green toward the right
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (w > 45) {
          level = (Math.random() > 0.6 ? 2 : 1);
          if (w > 48) level = (Math.random() > 0.5 ? 3 : 2);
          if (w > 50) level = (Math.random() > 0.5 ? 4 : 3);
        } else if (w > 42) {
          level = (Math.random() > 0.7 ? 1 : 0);
        }
        week.push({ level });
      }
      map.push(week);
    }
    return map;
  }, []);
}

const heatClass: Record<HeatCell['level'], string> = {
  0: 'bg-gray-200',
  1: 'bg-gray-300',
  2: 'bg-green-300',
  3: 'bg-green-400',
  4: 'bg-green-500',
};
type ProfileState = Pick<
  User,
  | 'firstName'
  | 'lastName'
  | 'bio'
  | 'username'
  | 'location'
  | 'socialLinks'
  | 'profilePictureUrl'
>;


const months = ['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
const weekdays = ['Mon','Wed','Fri','Sun'];


export default function ProfilePage() {
  const heatmap = useFakeHeatmap();
  const [profile, setProfile] = useState<ProfileState>({
    firstName: '',
    lastName: '',
    bio: '',
    username: '',
    profilePictureUrl: '',
    location: { latitude: '', longitude: '', locationName: '' },
    socialLinks: {
      website: '',
      instagram: '',
      twitter: '',
      youtube: '',
      linkedin: '',
      facebook: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    (async () => {
      setLoading(true);
      setError(null);

      const res = await fetchUser();

      if (!mountedRef.current) return;
      if (res.success && res.data) {
        const u = res.data;
        setProfile({
          firstName: u.firstName,
          lastName: u.lastName,
          bio: u.bio,
          username: u.username,
          profilePictureUrl: u.profilePictureUrl,
          // location is already normalized to strings by fetchUser()
          location: {
            latitude: u.location.latitude,
            longitude: u.location.longitude,
            locationName: u.location.locationName,
          },
          // social links already strings by fetchUser()
          socialLinks: {
            website: u.socialLinks.website,
            instagram: u.socialLinks.instagram,
            twitter: u.socialLinks.twitter,
            youtube: u.socialLinks.youtube,
            linkedin: u.socialLinks.linkedin,
            facebook: u.socialLinks.facebook,
          },
        });
      } else {
        setError(res.error ?? 'Failed to load user');
      }

      setLoading(false);
    })();

    return () => {
      mountedRef.current = false;
    };
  }, []);



  return (
    <main className="min-h-screen bg-[#F7F5F2] overflow-x-hidden">
      <div className="mx-auto max-w-[1050px] px-4 py-6">
        {/* Content area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-6">
          {/* Left column */}
          <div className="space-y-6 min-w-0">
            {/* Activity */}
            <section className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-gray-700">Activity</h2>
              <div className="flex gap-3 min-w-0">
                {/* Weekday labels */}
                <div className="flex flex-col justify-between pt-6 pb-1 text-[10px] text-gray-500 flex-shrink-0">
                  {weekdays.map((d) => (
                    <div key={d} className="h-4">{d}</div>
                  ))}
                </div>

                {/* Heatmap grid + months */}
                <div className="flex-1 min-w-0">
                  {/* Months row */}
                  <div className="mb-2 flex justify-between text-[10px] text-gray-500">
                    {months.map((m) => (
                      <span key={m} className="flex-1 text-center">{m}</span>
                    ))}
                  </div>

                  {/* Grid container - no overflow, fits within container */}
                  <div className="w-full">
                    <div className="grid grid-flow-col gap-[1px]" style={{gridTemplateColumns: `repeat(${heatmap.length}, minmax(0, 1fr))`}}>
                      {heatmap.map((week, wi) => (
                        <div key={wi} className="grid grid-rows-4 gap-[1px]">
                          {week.map((cell, ci) => (
                            <div
                              key={`${wi}-${ci}`}
                              className={`aspect-square w-full rounded-sm ${heatClass[cell.level]}`}
                              style={{minHeight: '8px', maxHeight: '12px'}}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer legend */}
                  <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500">
                    <span>What is this?</span>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      <div className="flex items-center gap-[2px]">
                        <span className="h-2 w-2 rounded bg-gray-300" />
                        <span className="h-2 w-2 rounded bg-green-300" />
                        <span className="h-2 w-2 rounded bg-green-400" />
                        <span className="h-2 w-2 rounded bg-green-500" />
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Memberships */}
            <section className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-gray-700">Memberships</h2>
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black flex-shrink-0">
                    <span className="text-sm font-bold text-white">AIS</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-gray-900 truncate">AI Automation Society</div>
                    <div className="text-sm text-gray-500">113.9k members • Free</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contributions */}
            <section className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-gray-700">Contributions</h2>
              <div className="flex items-center justify-between gap-3">
                <button className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex-shrink min-w-0">
                  <span className="truncate">Select a group to see contributions</span>
                  <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                </button>
                <button className="rounded-full border border-gray-300 bg-white p-2 hover:bg-gray-50 flex-shrink-0" aria-label="Filters">
                  <Settings className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </section>
          </div>

          {/* Right column (Profile card) */}
          <aside className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex flex-col items-center">
              <div className="relative h-36 w-36 overflow-hidden rounded-full">
                <Image src={profile.profilePictureUrl ?? "/head2.jpg"} alt={profile.username ?? "userprofile"} fill className='object-cover' />
                {/* <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                  Image
                </div> */}
              </div>

              <div className="mt-4 text-xl font-semibold text-gray-900">{profile.firstName + " " + profile.lastName}</div>
              <div className="text-sm text-gray-500">@{profile.username}</div>

              <p className="mt-3 text-center text-sm text-gray-700">
                {profile.bio}
              </p>

              <div className="mt-4 w-full space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  <span>Online now</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[12px] text-gray-600">📅</span>
                  <span>Joined Jul 29, 2025</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[12px] text-gray-600">📍</span>
                  <span>{profile.location.locationName}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-5 grid w-full grid-cols-3 divide-x divide-gray-200 overflow-hidden rounded-lg border border-gray-200 text-center">
                <div className="bg-white px-4 py-3">
                  <div className="text-lg font-semibold text-gray-900">0</div>
                  <div className="text-xs text-gray-500">Contributions</div>
                </div>
                <div className="bg-white px-4 py-3">
                  <div className="text-lg font-semibold text-gray-900">0</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div className="bg-white px-4 py-3">
                  <div className="text-lg font-semibold text-gray-900">1</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
              </div>
              <Link className='w-full' href={"/dashboard"}>
              <button className="mt-5 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
                EDIT PROFILE
              </button>
              
              </Link>

              <div className="mt-6 text-xs text-gray-400">
                Powered by <span className="font-semibold text-[#ff5a5f]">skool</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}