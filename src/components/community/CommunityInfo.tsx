import { Users, Crown, Zap, ThumbsUp } from "lucide-react"

interface CommunityMember {
  id: string
  name: string
  avatar: string
}

interface CommunityInfoProps {
  name: string
  url: string
  description: string
  bannerImage: string
  logo?: string
  stats: {
    members: string
    online: string
    admins: string
  }
  recentMembers: CommunityMember[]
  links: {
    accelerator?: string
    youtube?: string
  }
  onInvite?: () => void
}

export default function CommunityInfo({
  name,
  url,
  description,
  bannerImage,
  logo,
  stats,
  recentMembers,
  links,
  onInvite
}: CommunityInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
      {/* Banner */}
      <div className="relative w-full overflow-hidden rounded-t-lg">
        <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 relative">
          <img 
            src={bannerImage} 
            alt={`${name} banner`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-6">
        {/* Community Info */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">{name}</h2>
        <p className="text-gray-500 text-sm mb-2">{url}</p>
        <p className="text-gray-700 text-sm mb-4">{description}</p>

        {/* Action Links */}
        <div className="space-y-2 mb-6">
          {links.accelerator && (
            <a 
              href={links.accelerator}
              className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Join My Accelerator
            </a>
          )}
          {links.youtube && (
            <a 
              href={links.youtube}
              className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              Subscribe To YouTube
            </a>
          )}
        </div>

        {/* Statistics */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.members}</div>
              <div className="text-sm text-gray-500">Members</div>
            </div>
            <div className="border-l border-r border-gray-200 px-4">
              <div className="text-2xl font-bold text-gray-900">{stats.online}</div>
              <div className="text-sm text-gray-500">Online</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.admins}</div>
              <div className="text-sm text-gray-500">Admins</div>
            </div>
          </div>
        </div>

        {/* Recent Members */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Recent Members</span>
          </div>
          <div className="flex items-center gap-1">
            {recentMembers.slice(0, 8).map((member, index) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                style={{ zIndex: recentMembers.length - index }}
                title={member.name}
              />
            ))}
          </div>
        </div>

        {/* Invite Button */}
        <button
          onClick={onInvite}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
        >
          INVITE PEOPLE
        </button>
      </div>
    </div>
  )
} 