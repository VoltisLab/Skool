"use client"

import { Check, X } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        {/* Logo */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-[#313273]">s</span>
            <span className="text-black">k</span>
            <span className="text-[#313273]">o</span>
            <span className="text-black">o</span>
            <span className="text-[#313273]">l</span>
          </h1>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">Select your plan</h2>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-4xl w-full">
        {/* Hobby Plan */}
        <div className="bg-white rounded-lg shadow-lg p-8 flex-1">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">$9/month</div>
            <div className="text-lg font-medium text-gray-900">Hobby</div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">All features</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Unlimited members</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Unlimited courses</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">1 admin</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">10% transaction fee</span>
            </div>
            <div className="flex items-center gap-3">
              <X className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Custom URL</span>
            </div>
            <div className="flex items-center gap-3">
              <X className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Hide suggested communities</span>
            </div>
          </div>
          
          <button className="w-full bg-[#F8D481] hover:bg-[#F8D481]/90 text-black font-bold py-3 px-6 rounded-lg transition-colors">
            TRY FOR FREE
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-lg shadow-lg p-8 flex-1">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">$99/month</div>
            <div className="text-lg font-medium text-gray-900">Pro</div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">All features</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Unlimited members</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Unlimited courses</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Unlimited admins</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">2.9% transaction fee*</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Custom URL</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Hide suggested communities</span>
            </div>
          </div>
          
          <button className="w-full bg-[#F8D481] hover:bg-[#F8D481]/90 text-black font-bold py-3 px-6 rounded-lg transition-colors">
            TRY FOR FREE
          </button>
        </div>
      </div>

      {/* Footer - Transaction Fees Comparison */}
      <div className="text-center mt-12 max-w-2xl">
        <p className="text-sm text-gray-600 mb-6">
          * Skool has the lowest transaction fees
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Discord</span>
            <span className="font-medium">16%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Patreon</span>
            <span className="font-medium">14%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Whop</span>
            <span className="font-medium">13%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Circle</span>
            <span className="font-medium">7%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Stan</span>
            <span className="font-medium">6%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Skool</span>
            <span className="font-medium text-[#313273]">2.9%</span>
          </div>
        </div>
      </div>
    </div>
  )
} 