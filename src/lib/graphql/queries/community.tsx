import { gql } from "@apollo/client";

/** ===== Types that mirror your API shape (adjust if your schema differs) ===== */
export type CommunityFiltersInput = {
  categoryId?: number | null;
};

export type CommunityUser = {
  id: string;
  fullName: string | null;
  firstName: string | null;
  email: string | null;
  username: string | null;
  lastName: string | null;
  lastSeen: string | null;
  profilePictureUrl: string | null;
  isVerified: boolean | null;
  isInstructor: boolean | null;
};

export type CommunityCategory = {
  createdAt: string;
  index: number | null;
  isForAdminUse: boolean | null;
  id: string;
  name: string;
  sortBy: string | null;
  updatedAt: string;
};

export type Community = {
  billingCycle: string | null;
  coverPhoto: string | null;
  createdAt: string;
  icon: string | null;
  numberOfMembersOnline: number | null;
  name: string;
  description: string | null;
  id: string;
  is7daysTrialAllowed: boolean | null;
  isFree: boolean | null;
  isPublic: boolean | null;
  membershipStatus: string | null;
  numberOfAdmins: number | null;
  numberOfMembers: number | null;
  numberOfPendingMembershipRequests: number | null;
  updatedAt: string;
  user: CommunityUser;
  categories: CommunityCategory[];
};

export type GetCommunitiesData = {
  communities: Community[];
};

export type GetCommunitiesVars = {
  search: string;
  pageNumber: number;
  pageCount: number;
  filters?: CommunityFiltersInput;
};

export const GET_COMMUNITIES = gql`
  query GetCommunities(
    $search: String
    $pageNumber: Int!
    $pageCount: Int!
    $filters: CommunityFilterInput
  ) {
    communities(
      search: $search
      pageNumber: $pageNumber
      pageCount: $pageCount
      filters: $filters
    ) {
      billingCycle
      coverPhoto
      createdAt
      icon
      numberOfMembersOnline
      name
      description
      id
      is7daysTrialAllowed
      isFree
      isPublic
      membershipStatus
      numberOfAdmins
      numberOfMembers
      numberOfPendingMembershipRequests
      updatedAt
      user {
        id
        fullName
        firstName
        email
        username
        lastName
        lastSeen
        profilePictureUrl
        isVerified
        isInstructor
      }
      categories {
        createdAt
        index
        isForAdminUse
        id
        name
        sortBy
        updatedAt
      }
    }
  }
`;
