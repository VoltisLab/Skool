import { Calendar } from "lucide-react"

interface EventBannerProps {
  title: string
  timeLeft: string
  onClick?: () => void
}

export default function EventBanner({ title, timeLeft, onClick }: EventBannerProps) {
  return (
    <div 
      className="p-4 text-center"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-gray-600" />
        <span className="text-sm text-gray-900 text-center font-semibold">
          {title} is happening in {timeLeft}
        </span>
      </div>
    </div>
  )
} 