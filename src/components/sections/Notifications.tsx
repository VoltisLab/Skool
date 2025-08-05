// export default function Notifications() {
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
//       <p className="text-gray-500">Notification settings will be displayed here.</p>
//     </div>
//   )
// } 

'use client';

import Image from 'next/image';
import { useState } from 'react';
import CommunityNotificationSettingsModal from '../modals/NotificationModal';

const NotificationPreferences = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [settings, setSettings] = useState({
    followerEmail: true,
    affiliateEmail: true,
    kaChingSound: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };
   const handleSave = (settings: any) => {
    console.log('Saved settings:', settings);
    setIsOpen(false)
    // optionally: send to API
  };

  const communitySettings = [
    {
      id: 1,
      name: 'AI Automation Society',
      icon: '/head.jpg',
    },
    {
      id: 2,
      name: 'Software Developer Academy',
      icon: '/img1.jpg',
    },
    {
      id: 3,
      name: 'Society and Human',
      icon: '/img2.jpg',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border space-y-3 border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900">Notifications</h2>

      <div className="space-y-4">
        <ToggleItem
          label="New follower email notification"
          value={settings.followerEmail}
          onToggle={() => handleToggle('followerEmail')}
        />
        <ToggleItem
          label="New affiliate referral email notification"
          value={settings.affiliateEmail}
          onToggle={() => handleToggle('affiliateEmail')}
        />
        <ToggleItem
          label="New customer ka-ching sound"
          value={settings.kaChingSound}
          onToggle={() => handleToggle('kaChingSound')}
        />
      </div>

      <div className="space-y-5 pt-4">
        {communitySettings.map((community) => (
          <div key={community.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className='w-[40px] h-[40px] relative'>
              <Image
                src={community.icon}
                alt={community.name}
                fill
                className="rounded-md object-cover"
              />

              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">{community.name}</p>
                <p className="text-xs text-gray-500">Weekly digest • Hourly bundle</p>
              </div>
            </div>
            <button onClick={() => {
              setTitle(community.name)
              setIsOpen(true)
            }} className="text-sm font-semibold text-gray-600 border rounded px-4 py-1.5 hover:text-black">
              CHANGE
            </button>
          </div>
        ))}
      </div>
       <CommunityNotificationSettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        communityName={title}
      />
    </div>
  );
};

const ToggleItem = ({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-900">{label}</p>
    <div
      className={`relative w-10 h-5 transition duration-300 cursor-pointer ${
        value ? 'bg-[#313273]' : 'bg-gray-300'
      } rounded-full`}
      onClick={onToggle}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
          value ? 'translate-x-5' : ''
        }`}
      />
    </div>
   
  </div>
);

export default NotificationPreferences;
