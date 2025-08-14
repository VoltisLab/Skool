import { Settings, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const PayoutsTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Select country');

  const payoutInfo = {
    accountBalance: 0.00,
    nextPayoutAmount: 0,
    nextPayoutDays: 6,
    hasPendingPayouts: false
  };

  const countries = [
    'Albania',
    'Algeria', 
    'Angola',
    'Antigua & Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Bahrain',
    'Bangladesh'
  ];

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCountry('Select country');
    setIsDropdownOpen(false);
  };

  const handleContinue = () => {
    if (selectedCountry !== 'Select country') {
      // Handle continue logic here
      console.log('Selected country:', selectedCountry);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Payouts</h1>
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <Settings className='w-5 h-5' />
        </button>
      </div>

      <div className=" mb-6">
        <div className="flex items-center gap-10">
          <div className='bg-gray-50 border border-gray-300 w-60 text-center rounded-lg p-6'>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${payoutInfo.accountBalance.toFixed(2)}
            </div>
            <div className="text-sm text-[#909090]">Account balance</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-[#202124] mb-1">
              Next payout will be $0 in {payoutInfo.nextPayoutDays} days
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              $0 is pending 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left text-gray-500 py-8">
        No payouts yet
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Add payout method</h2>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Payouts go to section */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Payouts go to the group owner</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">MJ</span>
                  </div>
                  <span className="text-gray-900 font-medium">Miracle Joseph</span>
                </div>
              </div>

              {/* Country Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What country is your bank account in?
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
                  >
                    <span className={selectedCountry === 'Select country' ? 'text-gray-500' : 'text-gray-900'}>
                      {selectedCountry}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {/* Header */}
                      <div className="px-4 py-2 bg-yellow-100 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Select country</span>
                      </div>
                      {/* Countries */}
                      {countries.map((country) => (
                        <button
                          key={country}
                          onClick={() => handleCountrySelect(country)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 border-b border-gray-100 last:border-b-0"
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                CANCEL
              </button>
              <button
                onClick={handleContinue}
                disabled={selectedCountry === 'Select country'}
                className={`px-6 py-2 rounded font-medium ${
                  selectedCountry === 'Select country'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-200'
                }`}
              >
                CONTINUE →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayoutsTab;