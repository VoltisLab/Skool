import React, { useState } from 'react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  memberCount: number;
  isCurrent: boolean;
  hasFreeTrial: boolean;
}

const PricingTab: React.FC = () => {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      id: '1',
      name: 'Free',
      price: 0,
      memberCount: 1,
      isCurrent: true,
      hasFreeTrial: false
    }
  ]);

  const [freeTrialEnabled, setFreeTrialEnabled] = useState(false);

  const handleAddPrice = () => {
    console.log('Add price clicked');
  };

  const handleToggleFreeTrial = () => {
    setFreeTrialEnabled(!freeTrialEnabled);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-2">Pricing</h1>
        <p className="text-gray-600">
          Make money by charging for access to your community.{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Learn more.
          </a>
        </p>
      </div>

      <div className="space-y-4">
        {pricingTiers.map((tier) => (
          <div key={tier.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-lg">🏷️</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{tier.name}</span>
                    <span className="text-sm text-gray-500">{tier.memberCount} member</span>
                    {tier.isCurrent && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        Current price
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded">
                <div className="text-gray-400">⋯</div>
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddPrice}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="text-lg">+</span>
            <span className="font-medium">ADD PRICE</span>
          </div>
        </button>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <span className="font-medium">Give members a 7-day free trial</span>
          <button
            onClick={handleToggleFreeTrial}
            className={`w-12 h-6 rounded-full transition-colors ${
              freeTrialEnabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                freeTrialEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingTab;