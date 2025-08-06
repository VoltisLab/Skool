'use client';

import { ChevronDown, DollarSign } from 'lucide-react';

export default function Affiliates() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Affiliates</h1>
      <p className="text-gray-500 text-sm mb-8">
        Earn commission for life when you invite somebody to create or join a Skool community.
      </p>

      {/* Commission Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">$0</div>
          <div className="text-xs font-bold text-gray-500">Last 30 days</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-300">
          <div className="text-2xl font-bold text-gray-900">$0</div>
          <div className="text-xs font-bold text-gray-500">Lifetime</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">$0</div>
              <div className="text-sm text-gray-500">Account balance</div>
            </div>
            <button className="px-3 py-1 text-sm text-gray-400 bg-gray-200 rounded cursor-not-allowed">
              PAYOUT
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6">$0 available soon</p>

      {/* Your Affiliate Links */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your affiliate links</h2>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
              Skool platform
            </span>
          </div>
        <div className="rounded-lg ">
         
          <p className="text-sm text-gray-800 mb-5">
            Earn 40% commission when you invite somebody to create a Skool community.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value="https://www.skool.com/signup?ref=stanley-samuel-2133"
              readOnly
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg"
            />
            <button className="w-full sm:w-auto px-4 py-2 bg-[#313273] text-white text-sm font-medium rounded-lg hover:bg-[#2a2a5a] transition-colors">
              COPY
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2 w-full justify-end">
            <span className="text-sm text-gray-500">Active</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Referrals Display */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4 relative w-fit mx-auto">
          <DollarSign className="w-8 h-8 text-yellow-500" />
          <DollarSign className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1" />
          <DollarSign className="w-4 h-4 text-yellow-500 absolute -top-2 -right-2" />
        </div>
        <p className="text-gray-500">Your referrals will show here</p>
      </div>
    </div>
  );
}
