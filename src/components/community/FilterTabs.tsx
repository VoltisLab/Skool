import { Filter, MapPin, Play, Brain, Bot } from "lucide-react"

interface FilterTab {
  id: string
  label: string
  icon?: React.ReactNode
  count?: number
}

interface FilterTabsProps {
  tabs: FilterTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? "bg-gray-200 text-gray-900"
              : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
          {tab.count && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          )}
        </button>
      ))}
      
      <div className="flex items-center gap-2 ml-auto">
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Predefined tab configurations
export const defaultTabs: FilterTab[] = [
  { id: "all", label: "All" },
  { id: "announcements", label: "Announcements", icon: <MapPin className="w-4 h-4 text-red-500" /> },
  { id: "youtube", label: "YouTube Resources", icon: <Play className="w-4 h-4 text-red-500" /> },
  { id: "business", label: "Business & Strategy", icon: <Brain className="w-4 h-4 text-red-500" /> },
  { id: "tech", label: "Tech", icon: <Bot className="w-4 h-4 text-red-500" /> },
  { id: "more", label: "More..." },
] 