"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "@/components/SearchBar"
import CategoryFilter from "@/components/CategoryFilter"
import CommunityCard from "@/components/CommunityCard"
import Link from "next/link"

const communities = [
  {
    id: 1,
    rank: 1,
    name: "Brotherhood Of Scent",
    description: "#1 Fragrance Community 🏆 Our mission is to help YOU leverage the power of scent to become the man you know yourself to be. Join thousands of fragrance enthusiasts who share their passion for colognes, perfumes, and the art of smelling great.",
    members: "8k Members",
    price: "Free",
    category: "Self-improvement",
    image: "https://assets.skool.com/f/0c60dc308ee84090a5ee3e41ce349cd8/93980277d91b402b87f2e84fd98c23a2d1fe84feef884f12bb76cf81179f6662-md.jpg",
    avatar: "https://assets.skool.com/f/0c60dc308ee84090a5ee3e41ce349cd8/93980277d91b402b87f2e84fd98c23a2d1fe84feef884f12bb76cf81179f6662-md.jpg"
  },
  {
    id: 2,
    rank: 2,
    name: "Abbew Crew",
    description: "Transform your body and mind with proven fitness strategies. My mission is to help people reclaim their health, body and energy. Achieving fat loss or muscle building is not complicated - join our community of fitness enthusiasts and get the results you deserve.",
    members: "13.6k Members",
    price: "$129",
    category: "Health",
    image: "https://assets.skool.com/f/73d012bd0d504fda826841047f17ea81/13f44d3c1d394c0cb040468f83f055f41b0cb9cdaf884fdb95d026f0d8d40c16-md.jpg",
    avatar: "https://assets.skool.com/f/73d012bd0d504fda826841047f17ea81/13f44d3c1d394c0cb040468f83f055f41b0cb9cdaf884fdb95d026f0d8d40c16-md.jpg"
  },
  {
    id: 3,
    rank: 3,
    name: "Zero To Founder by Tom Bilyeu",
    description: "Start your business and get on the path to financial freedom with billion-dollar founder Tom Bilyeu. Learn proven strategies, connect with fellow entrepreneurs, and build the business of your dreams. From idea to IPO, we've got you covered.",
    members: "1.4k Members",
    price: "$119/month",
    category: "Money",
    image: "https://assets.skool.com/f/d4820176d84c4f69ae570c8e08a7e6ef/0283122c6b22436a8cee2992f086f3ad6bb2570d688e44f3aff09f8c93f9c3d9-md.jpg",
    avatar: "https://assets.skool.com/f/d4820176d84c4f69ae570c8e08a7e6ef/0283122c6b22436a8cee2992f086f3ad6bb2570d688e44f3aff09f8c93f9c3d9-md.jpg"
  },
  {
    id: 4,
    rank: 4,
    name: "Calligraphy Skool",
    description: "Learn modern calligraphy the fun, easy way! ✏️ With sisters Jordan & Jillian",
    members: "1.3k Members",
    price: "$9/month",
    category: "Hobbies",
    image: "https://assets.skool.com/f/37a997125c1a4a7aa2ecbf73c79e8468/da3feaa7c324405cb3480442e0d1fe8001365fd0492349bc8d000d5b94a91a67-md.jpg",
    avatar: "https://assets.skool.com/f/37a997125c1a4a7aa2ecbf73c79e8468/da3feaa7c324405cb3480442e0d1fe8001365fd0492349bc8d000d5b94a91a67-md.jpg"
  },
  {
    id: 5,
    rank: 5,
    name: "That Pickleball School",
    description: "🏓 THAT place for all pickleball players who want to get better.",
    members: "1k Members",
    price: "$39/month",
    category: "Sports",
    image: "https://assets.skool.com/f/4c619d1a1c3647e098a70ec3c0c4088b/61f4d0e2e7694663a2dbaed36abe053d3645e0433c2c47f8b9ad181b0be078fa-md.jpg",
    avatar: "https://assets.skool.com/f/4c619d1a1c3647e098a70ec3c0c4088b/61f4d0e2e7694663a2dbaed36abe053d3645e0433c2c47f8b9ad181b0be078fa-md.jpg"
  },
  {
    id: 6,
    rank: 6,
    name: "The Lady Change",
    description: "THE #1 community for menopausal (peri & post) women to lose weight, get healthier and regain their confidence!",
    members: "1.5k Members",
    price: "$49/month",
    category: "Health",
    image: "https://assets.skool.com/f/44b2fb4fbc424b16b63d61010ec229b5/e91c6dcd1dc04b90abfe100a14aa722fe24753e5b2da4de39fdfa3dd1659cc07-md.jpg",
    avatar: "https://assets.skool.com/f/44b2fb4fbc424b16b63d61010ec229b5/e91c6dcd1dc04b90abfe100a14aa722fe24753e5b2da4de39fdfa3dd1659cc07-md.jpg"
  },
  {
    id: 7,
    rank: 7,
    name: "Unison Producer Growth Hub",
    description: "The #1 free community for music producers to grow, learn, connect and simplify the process of producing pro-quality music.",
    members: "33.1k Members",
    price: "Free",
    category: "Music",
    image: "https://assets.skool.com/f/dc483cb4b9ed4236b442301fc284c180/c2440f53314b40798fe24b9849422cc1941169f8500b4c498686ec03d3e41aaf-md.jpg",
    avatar: "https://assets.skool.com/f/dc483cb4b9ed4236b442301fc284c180/c2440f53314b40798fe24b9849422cc1941169f8500b4c498686ec03d3e41aaf-md.jpg"
  },
  {
    id: 8,
    rank: 8,
    name: "The Aspinall Way",
    description: "Join the FIRST and ONLY Community Created by a UFC Champion, Become Extraordinary Today!🥇",
    members: "15.9k Members",
    price: "Free",
    category: "Sports",
    image: "https://assets.skool.com/f/83f66d7eb37844e2adbdab53dd48b3ce/a10406bb680d4d96bc291e135003d43f27c36fd6cb6d4f9bb795ba28d16e0ff3-md.jpg",
    avatar: "https://assets.skool.com/f/83f66d7eb37844e2adbdab53dd48b3ce/a10406bb680d4d96bc291e135003d43f27c36fd6cb6d4f9bb795ba28d16e0ff3-md.jpg"
  },
  {
    id: 9,
    rank: 9,
    name: "Day by Day Wellness Club",
    description: "#1 community dedicated to anyone on their journey to becoming their best self.",
    members: "55.9k Members",
    price: "Free",
    category: "Self-improvement",
    image: "https://assets.skool.com/f/cd9ce692cef44d459a51cdfb8731e48d/5fedeefdc5574e18b6487aa7c1e02d6c89cbb493c700449aaad7a9e98f5bf88c-md.jpg",
    avatar: "https://assets.skool.com/f/cd9ce692cef44d459a51cdfb8731e48d/5fedeefdc5574e18b6487aa7c1e02d6c89cbb493c700449aaad7a9e98f5bf88c-md.jpg"
  }
]

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
]

export default function HomePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredCommunities = useMemo(() => {
    return communities.filter((community) => {
      const matchesSearch =
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        activeCategory === "all" ||
        community.category?.toLowerCase() === activeCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeCategory])

  const handleCommunityClick = (communityId: number) => {
    router.push(`/community/${communityId}`)
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onClick={() => handleCommunityClick(community.id)}
            />
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">\ud83d\udd0d</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No communities found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or browse different categories
            </p>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("all")
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {filteredCommunities.length > 0 && (
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
                        ? 'bg-black text-white'
                        : 'text-gray-400 hover:text-gray-600'
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
  )
}
