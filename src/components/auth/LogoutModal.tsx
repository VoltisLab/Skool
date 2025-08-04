'use client';

import { useState } from 'react'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Logout</h2>
          
          {/* Message */}
          <p className="text-gray-600 mb-6">
            Are you sure you want to logout? You will need to log in again to access your account.
          </p>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-gray-700 font-medium rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              CANCEL
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-[#313273] text-white text-sm font-semibold py-2 px-4 rounded hover:bg-[#2a2a5a] disabled:opacity-50"
            >
              {isLoading ? 'LOGGING OUT...' : 'LOG OUT'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
