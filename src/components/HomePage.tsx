"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import CommunityCard from "@/components/CommunityCard";
import Link from "next/link";
import { fetchCommunities } from "@/hooks/useCommunities"; 
import type { Community } from "@/lib/graphql/queries/community";

const categories = [
  { id: "all", label: "All", emoji: "" },
  { id: "hobbies", label: "Hobbies", emoji: "\ud83c\udfaa" },
  { id: "music", label: "Music", emoji: "\ud83c\udfb5" },
  { id: "money", label: "Money", emoji: "\ud83d\udcb0" },
  { id: "spirituality", label: "Spirituality", emoji: "\ud83d\udd27" },
  { id: "tech", label: "Tech", emoji: "\ud83d\udda5\ufe0f" },
  { id: "health", label: "Health", emoji: "\ud83e\udd55" },
  { id: "sports", label: "Sports", emoji: "\u26bd" },
  { id: "self-improvement", label: "Self-improvement", emoji: "\ud83d\udcc8" },
];

function formatMembers(n?: number | null) {
  if (!n) return "0 Members";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M Members`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k Members`;
  return `${n} Members`;
}

function mapToUI(communities: Community[]) {
  const sorted = [...communities].sort(
    (a, b) => (b.numberOfMembers ?? 0) - (a.numberOfMembers ?? 0)
  );
  return sorted.map((c, i) => ({
    id: c.id,
    rank: i + 1,
    name: c.name,
    description: c.description ?? "",
    members: formatMembers(c.numberOfMembers),
    price: c.isFree ? "Free" : "Paid",
    category: c.categories?.[0]?.name ?? "General",
    image: c.coverPhoto ?? c.icon ?? null,
    avatar: c.icon ?? c.user?.profilePictureUrl ?? c.coverPhoto ?? null,
  }));
}

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [communities, setCommunities] = useState<ReturnType<typeof mapToUI>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetchCommunities({ search: "", pageNumber: 1, pageCount: 50 });
      if (res.success) {
        setCommunities(mapToUI(res.data));
      }
      setLoading(false);
    };
    load();
  }, []);

  const filteredCommunities = useMemo(() => {
    return communities.filter((community) => {
      const matchesSearch =
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "all" ||
        community.category?.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, communities]);

  const handleCommunityClick = (communityId: string | number) => {
    router.push(`/community/${communityId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-[1085px] mx-auto py-8 px-4 md:px-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-2">
            Discover communities
          </h1>
          <Link href="/create-account">
            <p className="text-[#909090] mb-8">
              or <span className="text-black font-semibold hover:underline">create your own</span>
            </p>
          </Link>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-2xl mx-auto mb-8"
          />
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onClick={() => handleCommunityClick(community.id)}
              />
            ))}
          </div>
        )}

        {filteredCommunities.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">\ud83d\udd0d</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No communities found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or browse different categories
            </p>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {filteredCommunities.length > 0 && !loading && (
        <div className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-[1085px] mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="text-gray-400 hover:text-gray-600 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  \u2190 Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-gray-400 text-xs">...</span>
                <button
                  onClick={() => setCurrentPage(34)}
                  className="w-8 h-8 rounded-full text-xs font-medium text-gray-400 hover:text-gray-600"
                >
                  34
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(34, currentPage + 1))}
                  className="text-gray-400 hover:text-gray-600 text-xs"
                >
                  Next \u2192
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-gray-600">Community</a>
                <a href="#" className="hover:text-gray-600">Affiliates</a>
                <a href="#" className="hover:text-gray-600">Support</a>
                <a href="#" className="hover:text-gray-600">Careers</a>
                <span>...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
