import { MapPin, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ChangeNameModal from '../modals/ChangeNameModal'

export default function Profile() {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
  const [firstName, setFirstName] = useState('Stanley')
  const [lastName, setLastName] = useState('Samuel')

  const handleNameSave = (newFirstName: string, newLastName: string) => {
    setFirstName(newFirstName)
    setLastName(newLastName)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      
      {/* Profile Photo */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-20 h-20">
          <Image
            src="/head.jpg"
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
          Change profile photo
        </button>
      </div>
      
      {/* Name Fields - Side by side */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              readOnly
              className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50 cursor-not-allowed"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              readOnly
              className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">
          You can only change your name once, and you must use your real name.{' '}
          <button 
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setIsNameModalOpen(true)}
          >
            Change name.
          </button>
        </p>
      </div>
      
      {/* URL Field */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            URL
          </label>
          <input
            type="text"
            defaultValue="skool.com/@stanley-samuel-2133"
            readOnly
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50 cursor-not-allowed"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          You can change your URL once you&apos;ve got 90 contributions, 30 followers, and been using it for 90 days.
        </p>
      </div>
      
      {/* Bio Field */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            Bio
          </label>
          <textarea
            defaultValue="Software Engineer"
            rows={3}
            readOnly
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 resize-none bg-gray-50 cursor-not-allowed"
          />
        </div>
        <div className="text-right mt-1">
          <span className="text-sm text-gray-400">17 / 150</span>
        </div>
      </div>
      
      {/* Location Field */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            Location
          </label>
          <input
            type="text"
            placeholder=""
            readOnly
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50 cursor-not-allowed"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <button className="flex items-center gap-2 text-blue-600 text-sm hover:text-blue-700">
            <MapPin className="w-4 h-4" />
            Change my map location
          </button>
          <button className="text-gray-500 text-sm hover:text-gray-700">
            Remove my map location
          </button>
        </div>
      </div>
      
      {/* Myers Briggs */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            Myers Briggs
          </label>
          <div className="relative">
            <select className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 appearance-none bg-white">
              <option>Don&apos;t show</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Expandable Sections */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="font-medium text-gray-900 text-sm">Social links</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="font-medium text-gray-900 text-sm">Membership visibility</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="font-medium text-gray-900 text-sm">Advanced</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Change Name Modal */}
      <ChangeNameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSave={handleNameSave}
        currentFirstName={firstName}
        currentLastName={lastName}
      />
    </div>
  )
} 