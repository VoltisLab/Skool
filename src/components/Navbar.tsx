import { ChevronUp, ChevronDown, Search } from "lucide-react"

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Skool Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-600">skool</div>
          <div className="flex flex-col">
            <ChevronUp className="h-3 w-3 text-gray-400" />
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        </div>

        {/* Search Bar in Header */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full pl-10 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Login Button */}
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          LOG IN
        </button>
      </div>
    </header>
  )
} 