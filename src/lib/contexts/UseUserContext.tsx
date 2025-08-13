import { apolloClient } from "@/lib/apollo-client";
import { VIEW_ME_QUERY } from "../graphql/query";
import { UPDATE_USER_MUTATION } from "../graphql/mutations";

// ————— Types —————
interface Location {
  latitude: string;
  locationName: string;
  longitude: string;
}

interface Phone {
  completed: boolean;
  countryCode: string;
  number: string;
}

export interface User {
  bio: string;
  dateJoined: string;
  displayName: string;
  dob: string;
  email: string;
  firstName: string;
  fullName: string;
  gender: string;
  hideFromSearchEngines: boolean;
  id: string;
  isInstructor: boolean;
  isVerified: boolean;
  lastLogin: string;
  lastName: string;
  lastSeen: string;
  profilePictureUrl: string;
  socialLinks: {
     website: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  facebook: string;
  };
  thumbnailUrl: string;
  username: string;
  location: Location;
  phone: Phone;
}

// ————— Helpers to keep lat/lng as strings —————
function toStr(v: unknown): string {
  if (v === null || v === undefined) return "";
  return typeof v === "string" ? v : String(v);
}

function normalizeLocationIn(user: any): Location {
  // Coerce server -> UI strings
  const loc = user?.location ?? {};
  return {
    latitude: toStr(loc.latitude),
    longitude: toStr(loc.longitude),
    locationName: toStr(loc.locationName),
  };
}

function normalizeLocationOut(loc?: { latitude?: any; longitude?: any; locationName?: any }) {
  if (!loc) return undefined;
  // Only include provided fields, always as strings
  const out: Record<string, string> = {};
  if (loc.locationName !== undefined) out.locationName = toStr(loc.locationName);
  if (loc.latitude !== undefined) out.latitude = toStr(loc.latitude);
  if (loc.longitude !== undefined) out.longitude = toStr(loc.longitude);
  return out;
}

// ————— Queries —————
export async function fetchUser(): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const { data } = await apolloClient.query<{ viewMe: any }>({
      query: VIEW_ME_QUERY,
      fetchPolicy: "no-cache",
    });

    const u = data.viewMe ?? {};
    const normalized: User = {
      bio: toStr(u.bio),
      dateJoined: toStr(u.dateJoined),
      displayName: toStr(u.displayName),
      dob: toStr(u.dob),
      email: toStr(u.email),
      firstName: toStr(u.firstName),
      fullName: toStr(u.fullName),
      gender: toStr(u.gender),
      hideFromSearchEngines: Boolean(u.hideFromSearchEngines),
      id: toStr(u.id),
      isInstructor: Boolean(u.isInstructor),
      isVerified: Boolean(u.isVerified),
      lastLogin: toStr(u.lastLogin),
      lastName: toStr(u.lastName),
      lastSeen: toStr(u.lastSeen),
      profilePictureUrl: toStr(u.profilePictureUrl),
      socialLinks: {
        website: toStr(u.socialLinks?.website),
        instagram: toStr(u.socialLinks?.instagram),
        twitter: toStr(u.socialLinks?.twitter), // X (Twitter)
        youtube: toStr(u.socialLinks?.youtube),
        linkedin: toStr(u.socialLinks?.linkedin),
        facebook: toStr(u.socialLinks?.facebook),
      },
      thumbnailUrl: toStr(u.thumbnailUrl),
      username: toStr(u.username),
      location: normalizeLocationIn(u),
      phone: {
        completed: Boolean(u?.phone?.completed),
        countryCode: toStr(u?.phone?.countryCode),
        number: toStr(u?.phone?.number),
      },
    };

    return { success: true, data: normalized };
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return { success: false, error: error.message || "Failed to fetch user" };
  }
}

// ————— Mutations —————
export async function updateUserProfile(variables: {
  bio?: string;
  country?: string; // keep if your schema still has it, else remove
  displayName?: string;
  dob?: string;
  firstName?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  hideFromSearchEngines?: boolean;
  lastName?: string;
  otp?: string;
  location?: { latitude?: string | number; longitude?: string | number; locationName?: string };
  phoneNumber?: { countryCode: string; number: string };
  profilePicture?: { profilePictureUrl: string; thumbnailUrl: string };
  socialLinks?: { links: { social: string; link: string; action: string }[] };
  username?: string;
}) {
  try {
    // Deep clone and normalize outgoing location to strings
    const vars = { ...variables } as typeof variables & { location?: any };
    if (variables.location) {
      vars.location = normalizeLocationOut(variables.location);
    }

    const { data } = await apolloClient.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: vars,
    });
    return { success: true, data: (data as any).updateUser };
  } catch (error: any) {
    console.error("Update user failed:", error);
    return { success: false, error: error.message };
  }
}
