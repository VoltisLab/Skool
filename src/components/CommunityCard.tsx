import Image from 'next/image'

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
      className="md:w-[380px] w-full max-w-full rounded-2xl shadow-2xl bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] overflow-hidden group transition-transform hover:-translate-y-2 hover:shadow-3xl duration-300 relative cursor-pointer"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-video">
        <Image
          src={community.image}
          alt={community.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />

        {/* Rank Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm bg-black/60 text-white">
          #{community.rank}
        </span>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#23253a88] to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="px-6 py-5 flex flex-col gap-3 bg-white/80 backdrop-blur-xl">
        {/* Top Row: Category & Price */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest bg-[#eceaff] text-[#786AED] px-3 py-1 rounded-full shadow-sm">
            {community.category}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {community.price}
          </span>
        </div>

        {/* Community Name */}
        <h3 className="text-xl font-extrabold text-gray-900 line-clamp-1">
          {community.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 font-medium line-clamp-3 min-h-[48px]">
          {community.description}
        </p>

        {/* Members */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[11px] text-gray-500 font-medium">
            Members
          </span>
          <span className="font-semibold text-[#786AED] text-xs">
            {community.members}
          </span>
        </div>
      </div>
    </div>
  )
}
