"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import CategoryFilter from "@/components/CategoryFilter"
import CommunityCard from "@/components/CommunityCard"
import Pagination from "@/components/Pagination"

// Sample community data based on the original site
const communities = [
  {
    id: 1,
    rank: 1,
    name: "Brotherhood Of Scent",
    description: "#1 Fragrance Community 🟢 Our mission is to help YOU leverage the power of scent to become the man you know yourself to be.",
    members: "8k Members",
    price: "Free",
    category: "Self-improvement",
    image: "https://ext.same-assets.com/637669732/1603192324.jpeg",
    avatar: "https://ext.same-assets.com/637669732/43396394.jpeg"
  },
  {
    id: 2,
    rank: 2,
    name: "Abbew Crew",
    description: "My mission is to help people reclaim their health, body and energy. Achieving fat loss or muscle building is not complicated. Try...",
    members: "13.6k Members",
    price: "$129",
    category: "Health",
    image: "https://ext.same-assets.com/637669732/2533540919.jpeg",
    avatar: "https://ext.same-assets.com/637669732/2074302467.jpeg"
  },
  {
    id: 3,
    rank: 3,
    name: "Zero To Founder by Tom Bilyeu",
    description: "Start your business and get on the path to financial freedom with billion-dollar founder Tom Bilyeu.",
    members: "1.4k Members",
    price: "$119/month",
    category: "Money",
    image: "https://ext.same-assets.com/637669732/553352441.jpeg",
    avatar: "https://ext.same-assets.com/637669732/2500256124.jpeg"
  },
  {
    id: 4,
    rank: 4,
    name: "Calligraphy Skool",
    description: "Learn modern calligraphy the fun, easy way! ✏️ With sisters Jordan & Jillian",
    members: "1.3k Members",
    price: "$9/month",
    category: "Hobbies",
    image: "https://ext.same-assets.com/637669732/3111728284.jpeg",
    avatar: "https://ext.same-assets.com/637669732/979783902.jpeg"
  },
  {
    id: 5,
    rank: 5,
    name: "That Pickleball School",
    description: "🏓 THAT place for all pickleball players who want to get better.",
    members: "1k Members",
    price: "$39/month",
    category: "Sports",
    image: "https://ext.same-assets.com/637669732/1559167490.jpeg",
    avatar: "https://ext.same-assets.com/637669732/2757558337.jpeg"
  },
  {
    id: 6,
    rank: 6,
    name: "The Lady Change",
    description: "THE #1 community for menopausal (peri & post) women to lose weight, get healthier and regain their confidence!",
    members: "1.5k Members",
    price: "$49/month",
    category: "Health",
    image: "https://ext.same-assets.com/637669732/2789519886.jpeg",
    avatar: "https://ext.same-assets.com/637669732/2361569434.jpeg"
  },
  {
    id: 7,
    rank: 7,
    name: "Unison Producer Growth Hub",
    description: "The #1 free community for music producers to grow, learn, connect and simplify the process of producing pro-quality music.",
    members: "33.1k Members",
    price: "Free",
    category: "Music",
    image: "https://ext.same-assets.com/637669732/4164097084.jpeg",
    avatar: "https://ext.same-assets.com/637669732/3948433604.jpeg"
  },
  {
    id: 8,
    rank: 8,
    name: "The Aspinall Way",
    description: "Join the FIRST and ONLY Community Created by a UFC Champion, Become Extraordinary Today!🥇",
    members: "15.9k Members",
    price: "Free",
    category: "Sports",
    image: "https://ext.same-assets.com/637669732/2937592109.jpeg",
    avatar: "https://ext.same-assets.com/637669732/1447937987.jpeg"
  },
  {
    id: 9,
    rank: 9,
    name: "Day by Day Wellness Club",
    description: "#1 community dedicated to anyone on their journey to becoming their best self.",
    members: "55.9k Members",
    price: "Free",
    category: "Self-improvement",
    image: "https://ext.same-assets.com/637669732/1591204924.jpeg",
    avatar: "https://ext.same-assets.com/637669732/2471419055.jpeg"
  }
]

const categories = [
  { id: "all", label: "All", emoji: "" },
  { id: "hobbies", label: "Hobbies", emoji: "🎪" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "money", label: "Money", emoji: "💰" },
  { id: "spirituality", label: "Spirituality", emoji: "🕯️" },
  { id: "tech", label: "Tech", emoji: "🖥️" },
  { id: "health", label: "Health", emoji: "🥕" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "self-improvement", label: "Self-improvement", emoji: "📈" },
  { id: "relationships", label: "Relationships", emoji: "💕" }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter communities based on search and category
  const filteredCommunities = useMemo(() => {
    return communities.filter(community => {
      const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           community.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = activeCategory === "all" ||
                             community.category?.toLowerCase() === activeCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeCategory])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-[1139px] mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover communities
          </h1>
          <p className="text-gray-600 mb-8">
            or <a href="#" className="text-blue-600 hover:underline">create your own</a>
          </p>

          {/* Search Bar */}
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-2xl mx-auto mb-8"
          />
        </div>

        {/* Category Filters */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Community Statistics Section */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="text-sm text-gray-600 mb-1">360 Members • $47/month</div>
          <div className="text-sm text-gray-600 mb-1">105.7k Members • Free</div>
          <div className="text-sm text-gray-600 mb-1">786 Members • $98/month</div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-center text-gray-600">
          {filteredCommunities.length} communities found
          {searchTerm && ` for "${searchTerm}"`}
          {activeCategory !== "all" && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
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

        {/* Pagination - only show if we have results */}
        {filteredCommunities.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={34}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-[1139px] mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Community</a>
            <a href="#" className="hover:text-gray-900">Affiliates</a>
            <a href="#" className="hover:text-gray-900">Support</a>
            <a href="#" className="hover:text-gray-900">Careers</a>
            <span>...</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
