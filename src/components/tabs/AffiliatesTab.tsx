import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const AffiliatesSection = () => {
  const [selectedRate, setSelectedRate] = useState('OFF');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const rates = [
    { value: 'OFF', label: 'OFF' },
    { value: '10%', label: '10%' },
    { value: '20%', label: '20%' },
    { value: '30%', label: '30%' },
    { value: '40%', label: '40% (most effective)' },
    { value: '50%', label: '50%' }
  ];

  const handleRateChange = (value: string) => {
    if (value === 'OFF') {
      setSelectedRate(value);
    } else {
      // Trigger upgrade modal for any paid option
      setIsUpgradeModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsUpgradeModalOpen(false);
  };

  const handleUpgrade = () => {
    // Handle upgrade logic here
    console.log('Upgrading to Pro...');
    closeModal();
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Affiliates</h2>
      <p className="text-gray-600 mb-6">
        Reward your members for referring their friends by offering recurring commissions.
      </p>
      
      <div className="space-y-3">
        {rates.map((rate) => (
          <label key={rate.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="affiliate-rate"
              value={rate.value}
              checked={selectedRate === rate.value}
              onChange={(e) => handleRateChange(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-3 text-gray-700 text-sm">
              {rate.label}
            </span>
          </label>
        ))}
      </div>

      {/* Upgrade to Pro Modal */}
      {isUpgradeModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center">
              {/* Lock Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upgrade to Pro
              </h3>
              
              {/* Subtitle */}
              <p className="text-gray-600 mb-8">
                To enable affiliates.
              </p>

              {/* Feature Comparison Table */}
              <div className="mb-8">
                <div className="grid grid-cols-3 gap-4">
                  {/* Header */}
                  <div></div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 mb-2">Hobby</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 mb-2">Pro</div>
                  </div>

                  {/* Features */}
                  <div className="text-left text-sm text-gray-700 py-2">Unlimited members</div>
                  <div className="text-center py-2">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </div>
                  <div className="text-center py-2">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </div>

                  <div className="text-left text-sm text-gray-700 py-2">Unlimited admins</div>
                  <div className="text-center py-2">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </div>
                  <div className="text-center py-2">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </div>

                  <div className="text-left text-sm text-gray-700 py-2">Transaction fee</div>
                  <div className="text-center py-2">
                    <span className="text-sm text-gray-700">10%</span>
                  </div>
                  <div className="text-center py-2">
                    <span className="text-sm font-semibold text-green-600">2.9%</span>
                  </div>

                  <div className="text-left text-sm text-gray-700 py-2">Plugins and affiliates</div>
                  <div className="text-center py-2">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </div>
                  <div className="text-center py-2">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </div>

                  <div className="text-left text-sm text-gray-700 py-2">Custom URL</div>
                  <div className="text-center py-2">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </div>
                  <div className="text-center py-2">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </div>

                  <div className="text-left text-sm text-gray-700 py-2">Hide suggested communities</div>
                  <div className="text-center py-2">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </div>
                  <div className="text-center py-2">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </div>
                </div>
              </div>

              {/* Upgrade Button */}
              <button
                onClick={handleUpgrade}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg mb-4 transition-colors"
              >
                UPGRADE TO PRO
              </button>

              {/* Pricing Info */}
              <p className="text-sm text-gray-600">
                Pro is $99/month. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliatesSection;