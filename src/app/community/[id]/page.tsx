"use client"

import { useParams, useRouter } from "next/navigation"
import { Play, Lock, Users, Tag, Star } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

// Sample community data - in a real app this would come from an API
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

// Video data with YouTube embeds
const videos = [
  {
    id: 1,
    title: "Introduction to Fragrance",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "dQw4w9WgXcQ",
    duration: "15:30"
  },
  {
    id: 2,
    title: "How to Choose Your Signature Scent",
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    videoId: "9bZkp7q19f0",
    duration: "12:45"
  },
  {
    id: 3,
    title: "Top 10 Fragrances for Men",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
    videoId: "jNQXAC9IVRw",
    duration: "18:20"
  },
  {
    id: 4,
    title: "Fragrance Application Techniques",
    thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
    videoId: "kJQP7kiw5Fk",
    duration: "8:15"
  }
]

export default function CommunityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const communityId = parseInt(params.id as string)

  const [currentVideo, setCurrentVideo] = useState(videos[0])
  const [isPlaying, setIsPlaying] = useState(false)

  // Find the community by ID
  const community = communities.find(c => c.id === communityId)

  // If community not found, show error or redirect
  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Community not found</h1>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go back home
          </button>
        </div>
      </div>
    )
  }

  const handleVideoSelect = (video: typeof videos[0]) => {
    setCurrentVideo(video)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-[1085px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Video Preview and Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{community.name}</h1>

              {/* Video Preview Area */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0`}
                    title={currentVideo.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image 
                      src={`https://img.youtube.com/vi/${currentVideo.videoId}/maxresdefault.jpg`}
                      alt={currentVideo.title}
                      fill
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
                      <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      >
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                      {currentVideo.duration}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                      1.2x
                    </div>
                  </>
                )}
              </div>

              {/* Video Thumbnails Section */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {videos.map((video) => (
                  <div 
                    key={video.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer group transition-all ${
                      currentVideo.id === video.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 relative">
                      <Image 
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Community Info */}
              <div className="py-6">
                {/* Tags */}
                <div className="flex items-center gap-4 mb-4 text-sm font-semibold text-gray-800">
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{community.members}</span>
                  </div>
                    <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span>{community.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Fixed avatar sizing */}
                    <Image 
                      src={community.avatar}
                      alt="Admin" 
                      width={20}
                      height={20}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>By Antonio O. Centeno</span>
                    <Star className="h-4 w-4 text-black fill-current" />
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  This group is hosted by Antonio Centeno and Real Men Real Style team.
                </p>

                {/* Community Rules */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-black mb-3">COMMUNITY RULES:</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Be Respectful: Treat others kindly, no profanities, and offer constructive criticism.</li>
                    <li>This isn&apos;t a place to ask for donations or sell things.</li>
                    <li>Talk about things that relate to men&apos;s fragrances.</li>
                    <li>Share tips, support each other, engage and be active.</li>
                    <li>Inactive accounts are deleted within 30 days.</li>
                  </ol>
                </div>

                {/* Community Benefits */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-black mb-3">THIS COMMUNITY IS FOR YOU IF YOU&apos;RE LOOKING TO:</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Learn about fragrance, cologne, Parfum, EDT, EDP, & perfumes.</li>
                    <li>Build connections with like-minded people</li>
                    <li>Learn from other fragrance lovers.</li>
                    <li>Teach others what you&apos;ve learned & share your opinions.</li>
                    <li>Become your best self.</li>
                  </ul>
                </div>

                {/* Inside Community */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-black mb-3">INSIDE THIS COMMUNITY YOU&apos;LL FIND:</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Access to courses and training.</li>
                    <li>Exclusive Coaching sessions and LIVE events.</li>
                    <li>Unfiltered reviews and recommendations.</li>
                    <li>Discounts & Giveaways</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-500">
                  *This community is for gentlemen who love fragrances and are aged 18+ and up.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Community Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              {/* Community Image with Gradient Banner */}
              <div className="relative w-full overflow-hidden rounded-lg">
                <div className="aspect-video bg-gradient-to-r from-orange-200 to-blue-200 relative">
                  {/* Main Image */}
                  <Image 
                    src={community.image} 
                    alt={community.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-6">
                {/* Community Info */}
                <h2 className="text-xl font-bold text-gray-900">{community.name}</h2>
                <p className="text-gray-500 text-xs mb-4">skool.com/{community.name.toLowerCase().replace(/\s+/g, '')}</p>

                {/* Mission Statement */}
                <p className="text-gray-700 mb-6 text-xs">
                  ❤️ {community.description}
                </p>

                {/* External Link */}
                <div className="mb-6">
                  <a href="#" className="text-gray-500 text-sm flex items-center gap-2">
                    🔗 {community.name} Instagram
                  </a>
                </div>

                {/* Statistics */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">27.5k</div>
                      <div className="text-sm text-gray-500">Members</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-200 px-4">
                      <div className="text-2xl font-bold text-black">12</div>
                      <div className="text-sm text-gray-500">Online</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">5</div>
                      <div className="text-sm text-gray-500">Admins</div>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <button className="w-full bg-black hover:bg-black/90 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm">
                  JOIN GROUP
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
