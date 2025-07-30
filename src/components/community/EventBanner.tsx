import { Calendar } from "lucide-react"

interface EventBannerProps {
  title: string
  timeLeft: string
  onClick?: () => void
}

export default function EventBanner({ title, timeLeft, onClick }: EventBannerProps) {
  return (
    <div 
      className="p-4 text-center w-full"
      onClick={onClick}
    >
      <div className="flex items-center text-center gap-3 w-full">
        <Calendar className="w-5 h-5 text-gray-600" />
        <p className="text-sm text-gray-900 text-center font-semibold">
          {title} is happening in {timeLeft}
        </p>
      </div>
    </div>
  )
} 