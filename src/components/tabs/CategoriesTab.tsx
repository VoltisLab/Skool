import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

const CategoriesSection = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const categories = [
    {
      name: 'General discussion',
      permissions: 'Members',
      sort: 'Default'
    }
  ];

  return (
    <div className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Categories</h2>
          <p className="text-gray-500">Organize posts with categories, permissions, and sort methods.</p>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-medium text-sm">
          NEW
        </button>
      </div>
      
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <span>Permissions: {category.permissions}</span>
                <span>Sort: {category.sort}</span>
              </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-400">
                      Move up
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-400">
                      Move down
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-400">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;