import React, { useState } from 'react';
import { CommunitySettings } from '@/lib/types';

interface GeneralTabProps {
  settings: CommunitySettings;
  onChange: (settings: CommunitySettings) => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = <K extends keyof CommunitySettings>(
    field: K,
    value: CommunitySettings[K]
  ) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
    onChange(updated);
  };

  const handleImageUpload = (type: 'icon' | 'cover') => {
    console.log(`Upload ${type} clicked`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex gap-6 mb-6">
          {/* Icon Upload */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
              <button 
                onClick={() => handleImageUpload('icon')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Upload
              </button>
            </div>
            <div className="text-sm">
              <div className="font-medium">Icon</div>
              <div className="text-gray-500">Recommended:</div>
              <div className="text-gray-500">128x128</div>
              <button className="text-blue-600 hover:text-blue-700 text-sm mt-1">
                CHANGE
              </button>
            </div>
          </div>

          {/* Cover Upload */}
          <div className="text-center">
            <div className="w-32 h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
              <button 
                onClick={() => handleImageUpload('cover')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Upload
              </button>
            </div>
            <div className="text-sm">
              <div className="font-medium">Cover</div>
              <div className="text-gray-500">Recommended:</div>
              <div className="text-gray-500">1084x576</div>
              <button className="text-blue-600 hover:text-blue-700 text-sm mt-1">
                CHANGE
              </button>
            </div>
          </div>
        </div>

        {/* Group Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Group name
          </label>
          <input
            type="text"
            value={localSettings.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={30}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {localSettings.name.length} / 30
          </div>
        </div>

        {/* Group Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Group description
          </label>
          <textarea
            value={localSettings.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            maxLength={150}
            placeholder="Group description"
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {localSettings.description.length} / 150
          </div>
        </div>

        {/* Custom URL */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⭐</span>
            <span className="font-medium">Stand out with a custom URL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">skool.com/{localSettings.url}</span>
            <button className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded text-sm transition-colors">
              CHANGE URL
            </button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6">
          <div className="flex gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="privacy"
                checked={localSettings.isPrivate}
                onChange={() => handleChange('isPrivate', true)}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex items-center gap-2">
                <div className="text-lg">🔒</div>
                <div>
                  <div className="font-medium">Private</div>
                  <div className="text-sm text-gray-500">
                    Only members can see who&apos;s in the group and what they post. Content is hidden from search engines.
                  </div>
                </div>
              </div>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="privacy"
                checked={!localSettings.isPrivate}
                onChange={() => handleChange('isPrivate', false)}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex items-center gap-2">
                <div className="text-lg">🌐</div>
                <div>
                  <div className="font-medium">Public</div>
                  <div className="text-sm text-gray-500">
                    Anyone can see who&apos;s in the group and what they post. Content is discoverable by search engines.
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Support Email */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Support email:</span>
            <span className="text-blue-600">{localSettings.supportEmail}</span>
            <button className="text-blue-600 hover:text-blue-700">
              (change)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;