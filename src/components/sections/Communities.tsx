import { Eye, Pin } from 'lucide-react'

const communities = [
  {
    id: 1,
    name: 'AI Automation Society',
    members: '109k',
    price: 'Free',
    icon: 'AIS',
    iconBg: 'bg-black'
  },
  {
    id: 2,
    name: 'AI Automation (A-Z)',
    members: '80.8k',
    price: 'Free',
    icon: 'AAA',
    iconBg: 'bg-black'
  },
  {
    id: 3,
    name: 'AI Automation Agency Hub',
    members: '217.1k',
    price: 'Free',
    icon: 'IIA',
    iconBg: 'bg-black'
  }
]

export default function Communities() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Communities</h1>
      <p className="text-gray-500 text-sm mb-6">Drag and drop to reorder, pin to sidebar, or hide.</p>
      
      <div className="space-y-4">
        {communities.map((community) => (
          <div key={community.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            {/* Community Icon */}
            <div className={`w-10 h-10 ${community.iconBg} rounded flex items-center justify-center text-white font-bold text-sm`}>
              {community.icon}
            </div>
            
            {/* Community Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{community.name}</h3>
              <p className="text-sm text-gray-500">{community.members} members • {community.price}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                SETTINGS
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Pin className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 