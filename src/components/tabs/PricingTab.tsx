import { Tag, X } from 'lucide-react';
import React, { useState } from 'react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  memberCount: number;
  isCurrent: boolean;
  hasFreeTrial: boolean;
}

// Add Price Modal Component
const AddPriceModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: (price: number, billingType: string) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  const [price, setPrice] = useState('');
  const [billingType, setBillingType] = useState('monthly-only');

  const handleAdd = () => {
    const priceValue = parseFloat(price);
    if (priceValue && priceValue > 0) {
      onAdd(priceValue, billingType);
      setPrice('');
      setBillingType('monthly-only');
      onClose();
    }
  };

  const handleCancel = () => {
    setPrice('');
    setBillingType('monthly-only');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-6">Add price</h2>

        {/* Price Input */}
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded hover:border">
            <span className="px-3 py-2 text-gray-500">$</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 px-3 py-2 outline-none "
            />
            <span className="px-3 py-2 text-gray-500 border-gray-300 font-bold text-xs">/month</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Prices are in USD, but payouts will be in your local currency.
          </p>
        </div>

        {/* Billing Options */}
        <div className="mb-6 space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="billing"
              value="monthly-only"
              checked={billingType === 'monthly-only'}
              onChange={(e) => setBillingType(e.target.value)}
              className="mr-3 w-4 h-4 text-blue-600"
            />
            <span>Monthly only</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="billing"
              value="monthly-and-annual"
              checked={billingType === 'monthly-and-annual'}
              onChange={(e) => setBillingType(e.target.value)}
              className="mr-3 w-4 h-4 text-blue-600"
            />
            <span>Monthly and annual</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="billing"
              value="annual-only"
              checked={billingType === 'annual-only'}
              onChange={(e) => setBillingType(e.target.value)}
              className="mr-3 w-4 h-4 text-blue-600"
            />
            <span>Annual only</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="billing"
              value="one-time"
              checked={billingType === 'one-time'}
              onChange={(e) => setBillingType(e.target.value)}
              className="mr-3 w-4 h-4 text-blue-600"
            />
            <span>1-time payment</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            CANCEL
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded font-medium hover:bg-gray-300 disabled:opacity-50"
            disabled={!price || parseFloat(price) <= 0}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [isAddPriceModalOpen, setIsAddPriceModalOpen] = useState(false);

  const handleAddPrice = () => {
    setIsAddPriceModalOpen(true);
  };

  const handleAddPriceSubmit = (price: number, billingType: string) => {
    const newTier: PricingTier = {
      id: Date.now().toString(),
      name: `$${price}${billingType === 'one-time' ? ' (One-time)' : '/month'}`,
      price: price,
      memberCount: 0,
      isCurrent: false,
      hasFreeTrial: false
    };
    
    setPricingTiers(tiers => [...tiers, newTier]);
  };

  const handleToggleFreeTrial = () => {
    setFreeTrialEnabled(!freeTrialEnabled);
  };

  const handleMenuClick = (tierId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedTierId(tierId);
    setIsMenuOpen(true);
  };

  const handleMakeCurrent = () => {
    if (selectedTierId) {
      setPricingTiers(tiers =>
        tiers.map(tier => ({
          ...tier,
          isCurrent: tier.id === selectedTierId
        }))
      );
    }
    setIsMenuOpen(false);
    setSelectedTierId(null);
  };

  const handleDeletePrice = () => {
    if (selectedTierId) {
      setPricingTiers(tiers => tiers.filter(tier => tier.id !== selectedTierId));
    }
    setIsMenuOpen(false);
    setSelectedTierId(null);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setSelectedTierId(null);
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
          <div key={tier.id} className="bg-gray-50 rounded-lg p-2 relative">
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
              <button 
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={(e) => handleMenuClick(tier.id, e)}
              >
                <div className="text-gray-400 font-bold ">⋯</div>
              </button>
            </div>
            
            {/* Dropdown Menu - positioned relative to this tier */}
            {isMenuOpen && selectedTierId === tier.id && (
              <>
                <div 
                  className="fixed inset-0 z-[9998]"
                  onClick={handleCloseMenu}
                />
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9999] max-w-32">
                  <button
                    onClick={handleMakeCurrent}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 text-sm"
                  >
                    Make current
                  </button>
                  <button
                    onClick={handleDeletePrice}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-600 text-sm"
                  >
                    Delete price
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        <div className='flex flex-row items-center gap-5'>
          <button
            onClick={handleAddPrice}
            className="bg-[#f8d481] font-bold rounded-lg p-2 text-center hover:border-gray-400 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-lg">+</span>
              <span className="font-medium">ADD PRICE</span>
            </div>
          </button>

          <div className="flex items-center justify-between gap-5">
            <button
              onClick={handleToggleFreeTrial}
              className={`w-12 h-5 items-center rounded-full transition-colors ${
                freeTrialEnabled ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full shadow transform transition-transform ${
                  freeTrialEnabled ? 'translate-x-7 bg-white ' : 'translate-x-0 bg-gray-500'
                }`}
              />
            </button>
            <p className="font-medium">Give members a 7-day free trial</p>
          </div>
        </div>
      </div>

      {/* Add Price Modal */}
      <AddPriceModal
        isOpen={isAddPriceModalOpen}
        onClose={() => setIsAddPriceModalOpen(false)}
        onAdd={handleAddPriceSubmit}
      />
    </div>
  );
};

export default PricingTab;