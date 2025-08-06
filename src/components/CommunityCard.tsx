import Image from "next/image"

interface Community {
  id: number
  rank: number
  name: string
  description: string
  members: string
  price: string
  category: string
  image: string
  avatar: string
}

interface CommunityCardProps {
  community: Community
  onClick?: () => void
}

export default function CommunityCard({ community, onClick }: CommunityCardProps) {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="">
        {/* Rank Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-black/50 text-white text-sm font-semibold px-3 py-2 rounded-full">
            #{community.rank}
          </div>
        </div>

        {/* Community Image */}
        <div className="aspect-video overflow-hidden rounded-t-lg relative">
          <Image
            src={community.image}
            alt={community.name}
            height={100}
            width={150}
            className="object-cover w-full transition-transform duration-200"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Community Info */}
        <div className="flex gap-3 mb-3 items-center">
          <Image
            src={community.avatar}
            fill
            alt={`${community.name} avatar`}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 leading-tight">
              {community.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {community.description}
        </p>

        {/* Stats */}
        <div className="flex items-center text-sm">
          <span className="text-gray-600">{community.members}</span>
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md ${
            community.price === "Free" 
              ? " text-gray-700" 
              : " text-gray-700"
          }`}>
            {community.price}
          </span>
        </div>
      </div>
    </div>
  )
} 