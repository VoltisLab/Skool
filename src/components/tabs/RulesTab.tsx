import React from 'react';
import { Link2, MoreHorizontal } from 'lucide-react';

const RulesSection = () => {
  const rules = [
    { number: 1, title: 'Be positive' },
    { number: 2, title: 'No self-promotion' },
    { number: 3, title: 'Make an effort' }
  ];

  return (
    <div className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Rules</h2>
          <p className="text-gray-500">Set guidelines for discussion.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Link2 className="w-4 h-4 text-gray-500" />
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-medium text-sm">
            NEW
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.number} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {rule.number}. {rule.title}
              </h3>
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesSection;