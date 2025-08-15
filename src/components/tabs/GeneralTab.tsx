import React, { useState, useRef } from 'react';
import { Star, Globe, Lock, CheckCircle } from 'lucide-react';

interface CommunitySettings {
  name: string;
  description: string;
  url: string;
  isPrivate: boolean;
  supportEmail: string;
}

interface GeneralTabProps {
  settings?: CommunitySettings;
  onChange?: (settings: CommunitySettings) => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ 
  settings = {
    name: 'NewCommunity',
    description: '',
    url: 'newcomm unity-3735',
    isPrivate: true,
    supportEmail: 'josephmiracle119@gmail.com'
  }, 
  onChange 
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showSupportEmailModal, setShowSupportEmailModal] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [tempSupportEmail, setTempSupportEmail] = useState(settings.supportEmail);
  const [tempUrl, setTempUrl] = useState(settings.url);
  const iconFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = <K extends keyof CommunitySettings>(
    field: K,
    value: CommunitySettings[K]
  ) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
    onChange?.(updated);
  };

  const handleImageUpload = (type: 'icon' | 'cover') => {
    if (type === 'icon' && iconFileInputRef.current) {
      iconFileInputRef.current.click();
    } else if (type === 'cover' && coverFileInputRef.current) {
      coverFileInputRef.current.click();
    }
  };

  const handleImageChange = (type: 'icon' | 'cover') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`${type} file selected:`, file.name);
      // Handle file upload logic here
    }
  };

  const handleSupportEmailSave = () => {
    handleChange('supportEmail', tempSupportEmail);
    setShowSupportEmailModal(false);
  };

  const handleUrlSave = () => {
    setShowUpgradeModal(true);
  };

  const isUrlModified = tempUrl !== settings.url;
  const urlIsAvailable = tempUrl.length > 0 && isUrlModified;

  return (
    <div className="px-6 bg-white">
      <div className="max-w-2xl">
        {/* Hidden file inputs */}
        <input
          ref={iconFileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange('icon')}
          className="hidden"
        />
        <input
          ref={coverFileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange('cover')}
          className="hidden"
        />

        {showUrlModal ? (
          // URL Change View - Replaces entire content
          <div>
            <h2 className="text-xl font-semibold mb-2">Custom URL</h2>
            <p className="text-gray-600 mb-6">
              Enter a URL below to see if it&apos;s available. We redirect your old URL to the new URL.
            </p>
            <div className="mb-4 relative">
              <input
                type="text"
                value={`skool.com/${tempUrl}`}
                onChange={(e) => {
                  const newUrl = e.target.value.replace('skool.com/', '');
                  setTempUrl(newUrl);
                }}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8 ${
                  urlIsAvailable ? '' : 'border-gray-300'
                }`}
              />
              {urlIsAvailable && (
                <CheckCircle fill='green' stroke='white' color='white' className="absolute right-2 top-2.5 h-5 w-5 text-white-500" />
              )}
            </div>
            {urlIsAvailable && (
              <p className="text-sm text-green-600 font-bold mb-4">
                This URL is available. Claim it while you can!
              </p>
            )}
            <div className="text-right text-xs text-gray-500 mb-6">
              {tempUrl.length} / 30
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUrlModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
              >
                CANCEL
              </button>
              <button
                onClick={handleUrlSave}
                disabled={!urlIsAvailable}
                className={`px-4 py-2 rounded font-medium ${
                  urlIsAvailable
                    ? 'bg-[#f8d481] text-gray-900 hover:bg-[#f6cc65]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                CLAIM URL
              </button>
            </div>
          </div>
        ) : (
          // Normal General Tab Content
          <>
            {/* Image Upload Section */}
            <div className="flex gap-8 mb-6">
              {/* Icon Upload */}
              <div className="flex flex-row gap-5 items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <button 
                    onClick={() => handleImageUpload('icon')}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Upload
                  </button>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900 mb-1">Icon</div>
                  <div className="text-xs text-gray-500 mb-1">Recommended:</div>
                  <div className="text-xs text-gray-500 mb-2">128x128</div>
                  <button 
                    onClick={() => handleImageUpload('icon')}
                    className="text-xs text-gray-400 border border-gray-400 rounded-md p-2 hover:text-gray-600 font-medium tracking-wider"
                  >
                    CHANGE
                  </button>
                </div>
              </div>

              {/* Cover Upload */}
              <div className="flex flex-row gap-5 items-center">
                <div className="w-52 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <button 
                    onClick={() => handleImageUpload('cover')}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Upload
                  </button>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900 mb-1">Cover</div>
                  <div className="text-xs text-gray-500 mb-1">Recommended:</div>
                  <div className="text-xs text-gray-500 mb-2">1084x576</div>
                  <button 
                    onClick={() => handleImageUpload('cover')}
                    className="text-xs text-gray-400 border border-gray-400 rounded-md p-2 hover:text-gray-600 font-medium tracking-wider"
                  >
                    CHANGE
                  </button>
                </div>
              </div>
            </div>

            {/* Group Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group name
              </label>
              <input
                type="text"
                value={localSettings.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                maxLength={30}
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {localSettings.name.length} / 30
              </div>
            </div>

            {/* Group Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group description
              </label>
              <input
                type="text"
                value={localSettings.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder=""
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {localSettings.description.length} / 150
              </div>
            </div>

            {/* Custom URL */}
            <div className="bg-[#FDF1D5] border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className='flex flex-col items-center'>
                  <Star className="inline-block h-5 w-5 border-black text-black" />
                  <Star className="inline-block h-3 w-3 mr-4 text-black" />
                </div>
                <span className="font-bold text-gray-900">Stand out with a custom URL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700 font-bold">skool.com/{localSettings.url}</span>
                <button 
                  onClick={() => {
                    setTempUrl(localSettings.url);
                    setShowUrlModal(true);
                  }}
                  className="px-4 py-2 bg-[#f8d481] text-gray-900 font-bold rounded text-sm transition-colors"
                >
                  CHANGE URL
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-md overflow-hidden mb-6">
              {/* Private Option */}
              <label
                className={`flex items-start gap-3 cursor-pointer p-4 border-r border-gray-300 ${
                  localSettings.isPrivate ? 'bg-white' : 'bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="privacy"
                  checked={localSettings.isPrivate}
                  onChange={() => handleChange('isPrivate', true)}
                  className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0"
                />
                <div>
                  <div className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                    <Lock size={17} /> Private
                  </div>
                  <div className="text-sm text-gray-600">
                    Only members can see who&apos;s in the group and what they post. Content is hidden from search engines.
                  </div>
                </div>
              </label>

              {/* Public Option */}
              <label
                className={`flex items-start gap-3 cursor-pointer p-4 ${
                  !localSettings.isPrivate ? 'bg-white' : 'bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="privacy"
                  checked={!localSettings.isPrivate}
                  onChange={() => handleChange('isPrivate', false)}
                  className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0"
                />
                <div>
                  <div className="font-medium text-gray-900 mb-1 flex gap-2 items-center">
                    <Globe size={17} /> Public
                  </div>
                  <div className="text-sm text-gray-600">
                    Anyone can see who&apos;s in the group and what they post. Content is discoverable by search engines.
                  </div>
                </div>
              </label>
            </div>

            {/* Support Email */}
            <div className="text-sm text-gray-700">
              <span className="font-medium">Support email: </span>
              <span className="text-blue-600">{localSettings.supportEmail}</span>
              <button
                onClick={() => {
                  setTempSupportEmail(localSettings.supportEmail);
                  setShowSupportEmailModal(true);
                }}
                className="text-blue-600 hover:text-blue-700 cursor-pointer ml-1"
              >
                (change)
              </button>
            </div>
          </>
        )}
      </div>

      {/* Support Email Modal */}
      {showSupportEmailModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <h2 className="text-lg font-semibold mb-4">Support email</h2>
            <p className="text-sm text-gray-600 mb-4">
              This email will be shown on your customers&apos; receipts.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support email
              </label>
              <input
                type="email"
                value={tempSupportEmail}
                onChange={(e) => setTempSupportEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSupportEmailModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                CANCEL
              </button>
              <button
                onClick={handleSupportEmailSave}
                className="px-4 py-2 bg-yellow-200 rounded hover:bg-yellow-300"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <h2 className="text-lg font-semibold mb-4">Upgrade to claim custom URL</h2>
            <div className="text-sm text-gray-600 mb-6">
              <p className="mb-2">You can only claim a custom URL with a paid account.</p>
              <p>You&apos;re currently in a free trial. Upgrade for $99/month to claim your URL immediately.</p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  console.log('Upgrading...');
                  setShowUpgradeModal(false);
                  setShowUrlModal(false);
                }}
                className="px-4 py-2 bg-[#f8d481] text-gray-900 rounded hover:bg-[#f6cc65] font-medium"
              >
                UPGRADE NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralTab;