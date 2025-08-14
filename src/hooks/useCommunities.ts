import {
  GET_COMMUNITIES,
  GetCommunitiesData,
  GetCommunitiesVars,
} from "@/lib/graphql/queries/community";
import { plainApolloClient } from "@/lib/plain-client";

type FetchCommunitiesInput = {
  search?: string;
  pageNumber?: number;
  pageCount?: number;
  categoryId?: number;
};

export async function fetchCommunities({
  search = "",
  pageNumber = 10,
  pageCount = 10,
  categoryId
}: FetchCommunitiesInput = {}) {
  try {
    const { data } = await plainApolloClient.query<GetCommunitiesData, GetCommunitiesVars>({
      query: GET_COMMUNITIES,
      variables: {
        search,
        pageNumber,
        pageCount,
        filters: { categoryId },
      },
      fetchPolicy: "no-cache", // or "network-only"
    });

    return { success: true as const, data: data.communities };
  } catch (error) {
    console.error("Error fetching communities:", error);
    return { success: false as const, error };
  }
}
