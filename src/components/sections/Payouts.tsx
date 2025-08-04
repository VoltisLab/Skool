import { Settings } from 'lucide-react'

export default function Payouts() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-500 text-sm mb-8">Payouts for community and affiliate earnings.</p>
      
      <div className="text-center py-12">
        <p className="text-gray-500">No payouts yet</p>
      </div>
    </div>
  )
} 