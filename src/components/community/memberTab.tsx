import React, { useState } from 'react';

export default function CommunityTabs() {
  const [activeTab, setActiveTab] = useState('members');

  const tabs = [
    { id: 'members', label: 'Members', count: '106485' },
    { id: 'admins', label: 'Admins', count: '10' },
    { id: 'online', label: 'Online', count: '506' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 gap-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-500 text-white'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.label} {tab.count}
          </div>
        ))}
      </div>

      {/* Invite Button */}
      <div className="bg-[#313273] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#2a2a5a] cursor-pointer w-fit self-start sm:self-auto">
        INVITE
      </div>
    </div>
  );
}
