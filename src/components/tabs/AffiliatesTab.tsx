import React, { useState } from 'react';

const AffiliatesSection = () => {
  const [selectedRate, setSelectedRate] = useState('OFF');

  const rates = [
    { value: 'OFF', label: 'OFF' },
    { value: '10%', label: '10%' },
    { value: '20%', label: '20%' },
    { value: '30%', label: '30%' },
    { value: '40%', label: '40% (most effective)' },
    { value: '50%', label: '50%' }
  ];

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
              onChange={(e) => setSelectedRate(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-3 text-gray-700 text-sm">
              {rate.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AffiliatesSection;