import { useState } from 'react'

interface ChangeNameModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (firstName: string, lastName: string) => void
  currentFirstName: string
  currentLastName: string
}

export default function ChangeNameModal({
  isOpen,
  onClose,
  onSave,
  currentFirstName,
  currentLastName
}: ChangeNameModalProps) {
  const [firstName, setFirstName] = useState(currentFirstName)
  const [lastName, setLastName] = useState(currentLastName)

  const handleSave = () => {
    onSave(firstName, lastName)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">Change name</h2>
          
          {/* Instructional Text */}
          <p className="text-sm text-gray-600 mb-6">
            You can only change your name once so be careful.
          </p>
          
          {/* Input Fields */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="Last Name"
              />
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 font-medium rounded hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300 transition-colors"
            >
              CHANGE NAME
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 