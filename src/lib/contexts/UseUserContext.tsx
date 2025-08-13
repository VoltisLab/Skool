import { apolloClient } from "@/lib/apollo-client";
import { VIEW_ME_QUERY } from "../graphql/query";
import { UPDATE_USER_MUTATION } from "../graphql/mutations";

/* ========== Domain Types (what your app uses) ========== */

export interface Location {
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
    twitter: string;  // “X” stored under `twitter` key here
    youtube: string;
    linkedin: string;
    facebook: string;
  };
  thumbnailUrl: string;
  username: string;
  location: Location;
  phone: Phone;
}

/* ========== GraphQL Wire Types (what the API returns/expects) ========== */

/** The server can return strings or numbers for coords, or null/undefined. */
interface GqlLocationIn {
  latitude?: string | number | null;
  longitude?: string | number | null;
  locationName?: string | null;
}

interface GqlPhoneIn {
  completed?: boolean | null;
  countryCode?: string | null;
  number?: string | null;
}

/** Shape of the `viewMe` object coming from your GraphQL API. */
interface GqlUserIn {
  bio?: string | null;
  dateJoined?: string | null;
  displayName?: string | null;
  dob?: string | null;
  email?: string | null;
  firstName?: string | null;
  fullName?: string | null;
  gender?: string | null;
  hideFromSearchEngines?: boolean | null;
  id?: string | null;
  isInstructor?: boolean | null;
  isVerified?: boolean | null;
  lastLogin?: string | null;
  lastName?: string | null;
  lastSeen?: string | null;
  profilePictureUrl?: string | null;
  socialLinks?: {
    website?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    youtube?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
  } | null;
  thumbnailUrl?: string | null;
  username?: string | null;
  location?: GqlLocationIn | null;
  phone?: GqlPhoneIn | null;
}

/** Query and mutation envelope types */
interface ViewMeQueryResponse {
  viewMe: GqlUserIn;
}

type SocialAction = "ADD" | "REMOVE" | "UPDATE";

interface SocialLinkOp {
  social: string;
  link?: string;
  action: SocialAction;
}

interface UpdateUserMutationVariables {
  bio?: string;
  country?: string; // keep if your schema still has it; otherwise remove
  displayName?: string;
  dob?: string;
  firstName?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  hideFromSearchEngines?: boolean;
  lastName?: string;
  otp?: string;
  // Location is expected as strings per your requirement
  location?: {
    latitude?: string;
    longitude?: string;
    locationName?: string;
  };
  phoneNumber?: { countryCode: string; number: string };
  profilePicture?: { profilePictureUrl: string; thumbnailUrl: string };
  socialLinks?: { links: SocialLinkOp[] };
  username?: string;
}

interface UpdateUserMutationResponse {
  updateUser: {
    message: string;
    restToken?: string | null;
    token?: string | null;
  } | null;
}

/* ========== Helpers to keep lat/lng as strings ========== */

function toStr(v: unknown): string {
  if (v === null || v === undefined) return "";
  return typeof v === "string" ? v : String(v);
}

function normalizeLocationIn(u: { location?: GqlLocationIn | null }): Location {
  const loc = u.location ?? {};
  return {
    latitude: toStr(loc.latitude),
    longitude: toStr(loc.longitude),
    locationName: toStr(loc.locationName),
  };
}

/** Coerce outgoing location to strings (omit if nothing provided). */
function normalizeLocationOut(
  loc?: { latitude?: string | number | null; longitude?: string | number | null; locationName?: string | null }
): UpdateUserMutationVariables["location"] | undefined {
  if (!loc) return undefined;
  const out: UpdateUserMutationVariables["location"] = {};
  if (loc.locationName !== undefined && loc.locationName !== null) out.locationName = toStr(loc.locationName);
  if (loc.latitude !== undefined && loc.latitude !== null) out.latitude = toStr(loc.latitude);
  if (loc.longitude !== undefined && loc.longitude !== null) out.longitude = toStr(loc.longitude);
  return Object.keys(out).length ? out : undefined;
}

/* ========== Queries ========== */

export async function fetchUser(): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const { data } = await apolloClient.query<ViewMeQueryResponse>({
      query: VIEW_ME_QUERY,
      fetchPolicy: "no-cache",
    });

    const u = data?.viewMe ?? {};

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
        twitter: toStr(u.socialLinks?.twitter), // “X”
        youtube: toStr(u.socialLinks?.youtube),
        linkedin: toStr(u.socialLinks?.linkedin),
        facebook: toStr(u.socialLinks?.facebook),
      },
      thumbnailUrl: toStr(u.thumbnailUrl),
      username: toStr(u.username),
      location: normalizeLocationIn(u),
      phone: {
        completed: Boolean(u.phone?.completed),
        countryCode: toStr(u.phone?.countryCode),
        number: toStr(u.phone?.number),
      },
    };

    return { success: true, data: normalized };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch user";
    console.error("Error fetching user:", err);
    return { success: false, error: message };
  }
}

/* ========== Mutations ========== */

export async function updateUserProfile(variables: UpdateUserMutationVariables) {
  try {
    // Clone and coerce location fields to strings if present
    const vars: UpdateUserMutationVariables = { ...variables };
    if (variables.location) {
      vars.location = normalizeLocationOut(variables.location);
    }

    const { data } = await apolloClient.mutate<UpdateUserMutationResponse, UpdateUserMutationVariables>({
      mutation: UPDATE_USER_MUTATION,
      variables: vars,
    });

    return { success: true, data: data?.updateUser ?? null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update user failed";
    console.error("Update user failed:", err);
    return { success: false, error: message };
  }
}
