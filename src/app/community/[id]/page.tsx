"use client"

import { useParams, useRouter } from "next/navigation"
import { ChevronDown, Play, Lock, Users, Tag, Star, Volume2, SkipBack, SkipForward } from "lucide-react"

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
    image: "https://ext.same-assets.com/637669732/1603192324.jpeg",
    avatar: "https://ext.same-assets.com/637669732/43396394.jpeg"
  },
  {
    id: 2,
    rank: 2,
    name: "Abbew Crew",
    description: "Transform your body and mind with proven fitness strategies. My mission is to help people reclaim their health, body and energy. Achieving fat loss or muscle building is not complicated - join our community of fitness enthusiasts and get the results you deserve.",
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
    description: "Start your business and get on the path to financial freedom with billion-dollar founder Tom Bilyeu. Learn proven strategies, connect with fellow entrepreneurs, and build the business of your dreams. From idea to IPO, we've got you covered.",
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

export default function CommunityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const communityId = parseInt(params.id as string)
  
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

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-[1085px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Video Preview and Description */}
          <div className="lg:col-span-2 ">
            {/* Video Preview Area */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{community.name}</h1>
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={community.image} 
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-gray-800 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                  20:45
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                  1.2x
                </div>
              </div>

              {/* Video Thumbnails Section */}
              <div className="grid grid-cols-6 gap-4 mb-4">
                {/* Video Thumbnail 1 */}
                <div className="relative rounded-lg overflow-hidden cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 relative">
                    <img 
                      src={community.image} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 relative">
                    <img 
                      src={community.image} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 relative">
                    <img 
                      src={community.image} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 relative">
                    <img 
                      src={community.image} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
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
                    <img 
                      src={community.avatar} 
                      alt="Admin" 
                      className="w-5 h-5 rounded-full"
                    />
                    <span>By Antonio O. Centeno</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                </div>

                {/* Join Instructions */}
                {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-gray-800 font-medium">
                    Click the yellow 'Join' button and then PLEASE answer our 3 vetting questions - you MUST answer them.
                  </p>
                </div> */}

                <p className="text-gray-600 mb-6">
                  This group is hosted by Antonio Centeno and Real Men Real Style team.
                </p>

                {/* Community Rules */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">COMMUNITY RULES:</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Be Respectful: Treat others kindly, no profanities, and offer constructive criticism.</li>
                    <li>This isn't a place to ask for donations or sell things.</li>
                    <li>Talk about things that relate to men's fragrances.</li>
                    <li>Share tips, support each other, engage and be active.</li>
                    <li>Inactive accounts are deleted within 30 days.</li>
                  </ol>
                </div>

                {/* Community Benefits */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">THIS COMMUNITY IS FOR YOU IF YOU'RE LOOKING TO:</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Learn about fragrance, cologne, Parfum, EDT, EDP, & perfumes.</li>
                    <li>Build connections with like-minded people</li>
                    <li>Learn from other fragrance lovers.</li>
                    <li>Teach others what you've learned & share your opinions.</li>
                    <li>Become your best self.</li>
                  </ul>
                </div>

                {/* Inside Community */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">INSIDE THIS COMMUNITY YOU'LL FIND:</h2>
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

            {/* Additional Content Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">COMMUNITY RULES</h3>
                <p className="text-sm text-gray-600">Learn how to get the most out of this community</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Engage and Level-up</h3>
                <p className="text-sm text-gray-600">Participate in discussions and grow with the community</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Unlock Exclusive Courses</h3>
                <p className="text-sm text-gray-600">Access premium content and training materials</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Win Awesome Prizes!</h3>
                <p className="text-sm text-gray-600">Participate in giveaways and contests</p>
              </div>
            </div> */}
          </div>

          {/* Right Side - Community Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              {/* Community Image with Gradient Banner */}
              <div className="relative w-full overflow-hidden rounded-lg">
                <div className="aspect-video bg-gradient-to-r from-orange-200 to-blue-200 relative">
                 
                  {/* Main Image */}
                  <img 
                    src={community.image} 
                    alt={community.name}
                    className="absolute top-0 right-0 w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-6">
                {/* Community Info */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">{community.name}</h2>
                <p className="text-gray-500 text-sm mb-4">skool.com/{community.name.toLowerCase().replace(/\s+/g, '')}</p>

                {/* Mission Statement */}
                <p className="text-gray-700 mb-6">
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
                      <div className="text-2xl font-bold text-gray-900">27.5k</div>
                      <div className="text-sm text-gray-500">Members</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-200 px-4">
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-500">Online</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">5</div>
                      <div className="text-sm text-gray-500">Admins</div>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <button className="w-full bg-[#F8D481] hover:bg-[#F8D481]/90 text-black font-bold py-3 px-4 rounded-lg transition-colors shadow-sm">
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