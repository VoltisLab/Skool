// export default function Chat() {
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Chat</h1>
//       <p className="text-gray-500">Chat settings will be displayed here.</p>
//     </div>
//   )
// } 

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const communities = [
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

const MessageSettings = () => {
  const [notificationSound, setNotificationSound] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [chatSettings, setChatSettings] = useState(
    communities.reduce((acc, group) => {
      acc[group.id] = 'ON';
      return acc;
    }, {} as Record<number, 'ON' | 'OFF'>)
  );
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const handleChatChange = (groupId: number, value: 'ON' | 'OFF') => {
    setChatSettings((prev) => ({ ...prev, [groupId]: value }));
    setDropdownOpen(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-10">
      {/* Notifications */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Notify me with sound and blinking tab header when somebody messages me.
          </p>
          <Toggle value={notificationSound} onChange={() => setNotificationSound(!notificationSound)} />
        </div>
      </section>

      {/* Email Notifications */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Email notifications</h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
           {" If you're offline and somebody messages you, we'll let you know via email. We won't email you if you're online."}
          </p>
          <Toggle value={emailNotification} onChange={() => setEmailNotification(!emailNotification)} />
        </div>
      </section>

      {/* Who can message me */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Who can message me?</h2>
        <p className="text-sm text-gray-700">
          {"Only members in the group you're in can message you. You choose what group users can message you from by turning your chat on/off below."}
        </p>

        {communities.map((group) => (
          <div key={group.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={group.icon}
                alt={group.name}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
              <span className="text-sm font-medium text-gray-900">{group.name}</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === group.id ? null : group.id)}
                className="flex items-center gap-2 border px-4 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-black"
              >
                💬 {chatSettings[group.id]} <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen === group.id && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                  {['ON', 'OFF'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleChatChange(group.id, option as 'ON' | 'OFF')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        chatSettings[group.id] === option ? 'font-semibold' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Blocked Users */}
      <section>
        <h2 className="text-lg font-bold text-gray-900">Blocked users</h2>
        <p className="text-sm text-gray-700">You have no blocked users.</p>
      </section>
    </div>
  );
};

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => {
  return (
    <div
      className={`relative w-10 h-5 rounded-full cursor-pointer transition ${
        value ? 'bg-[#313273]' : 'bg-gray-300'
      }`}
      onClick={onChange}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          value ? 'translate-x-5' : ''
        }`}
      />
    </div>
  );
};

export default MessageSettings;
