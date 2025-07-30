import { ThumbsUp, MessageCircle, MapPin, Star, Trophy } from "lucide-react"

interface Commenter {
  id: string
  name: string
  avatar: string
}

interface PostCardProps {
  id: string
  author: {
    name: string
    avatar: string
    badge?: string
  }
  timestamp: string
  category?: {
    name: string
    icon?: React.ReactNode
  }
  title: string
  content: string
  media?: {
    type: 'image' | 'video' | 'document'
    url: string
    alt: string
  }
  engagement: {
    likes: number
    comments: number
    recentCommenters: Commenter[]
    lastCommentTime?: string
  }
  isPinned?: boolean
  hasWins?: boolean
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
}

export default function PostCard({
  id,
  author,
  timestamp,
  category,
  title,
  content,
  media,
  engagement,
  isPinned = false,
  hasWins = false,
  onLike,
  onComment
}: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="relative">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {author.badge && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {author.badge}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-sm">{author.name}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <span>{timestamp}</span>
              {hasWins && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-yellow-500" />
                    <span>Wins</span>
                  </div>
                </>
              )}
            </div>
            
            {/* Pinned indicator and title */}
            <div className="flex items-center gap-2 mb-2">
              {isPinned && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <MapPin className="w-3 h-3 text-red-500" />
                </div>
              )}
              <h2 className="font-bold text-gray-900 text-base leading-tight">{title}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
            </div>
          </div>
          
          {media && (
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={media.url}
                alt={media.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Engagement */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onLike?.(id)}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm font-medium">{engagement.likes}</span>
          </button>
          
          <button
            onClick={() => onComment?.(id)}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{engagement.comments}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {engagement.recentCommenters.length > 0 && (
            <div className="flex items-center gap-1">
              {engagement.recentCommenters.slice(0, 1).map((commenter, index) => (
                <img
                  key={commenter.id}
                  src={commenter.avatar}
                  alt={commenter.name}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  style={{ zIndex: engagement.recentCommenters.length - index }}
                />
              ))}
            </div>
          )}
          
          {engagement.lastCommentTime && (
            <span className="text-blue-600 text-xs font-medium">
              New comment {engagement.lastCommentTime}
            </span>
          )}
        </div>
      </div>
    </div>
  )
} 