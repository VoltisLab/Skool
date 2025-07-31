"use client"

import CommunityCard from '@/components/community/communityCard'
import { ChevronDown, Play, Lock, Users, Tag, Star, Volume2, SkipBack, SkipForward } from "lucide-react"

// Using a single community object directly
const community = {
  id: 1,
  rank: 1,
  name: "Brotherhood Of Scent",
  description: "#1 Fragrance Community 🏆 Our mission is to help YOU leverage the power of scent to become the man you know yourself to be. Join thousands of fragrance enthusiasts who share their passion for colognes, perfumes, and the art of smelling great.",
  members: "8k Members",
  price: "Free",
  category: "Self-improvement",
  image: "https://ext.same-assets.com/637669732/1603192324.jpeg",
  avatar: "https://ext.same-assets.com/637669732/43396394.jpeg"
}

export default function CommunityDetailPage() {
  
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
           

            <CommunityCard/>
          </div>
        </div>
      </main>
    </div>
  )
}