import { Tag } from 'lucide-react';
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
    <div className="px-6">
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
          <div key={tier.id} className=" bg-gray-50  rounded-lg p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className='font-bold flex items-center gap-3'>
                  <Tag /> {tier.name}
                </div>
                <div>
                  <div className="flex items-center gap-10">
                    <span className="text-sm text-blue-600">{tier.memberCount} member</span>
                    {tier.isCurrent && (
                      <span className="px-2 py-1 bg-green-700 text-white text-xs font-bold rounded">
                        Current price
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <div className="text-gray-400 font-bold ">⋯</div>
              </button>
            </div>
          </div>
        ))}

        <div className='flex flex-row items-center gap-5'>
          <button
          onClick={handleAddPrice}
          className=" bg-[#f8d481] font-bold rounded-lg p-2 text-center hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="text-lg">+</span>
            <span className="font-medium">ADD PRICE</span>
          </div>
        </button>

        <div className="flex items-center justify-between gap-5 ">
          <button
            onClick={handleToggleFreeTrial}
            className={`w-12 h-5 items-center rounded-full transition-colors ${
              freeTrialEnabled ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full shadow transform transition-transform ${
                freeTrialEnabled ? 'translate-x-6 bg-white ' : 'translate-x-1 bg-gray-500'
              }`}
            />
          </button>
          <p className="font-medium">Give members a 7-day free trial</p>
        </div>

        </div>

      </div>
    </div>
  );
};

export default PricingTab;