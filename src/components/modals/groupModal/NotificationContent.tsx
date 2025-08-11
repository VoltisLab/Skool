'use client';

import React, { useState } from 'react';

const settings = [
  {
    label: 'Digest email',
    description: 'summary of popular posts',
    options: ['Weekly (default)', 'Daily', 'Off'],
  },
  {
    label: 'Notifications email',
    description: 'summary of unread notifications',
    options: ['Hourly (default)', 'Daily', 'Off'],
  },
  {
    label: 'Likes',
    description: 'when somebody likes my posts or comments',
    options: ['Notify me (default)', 'Don’t notify me'],
  },
  {
    label: 'Admin announcements',
    description: 'get email broadcasts sent by admins',
    options: ['Yes (default)', 'No'],
  },
  {
    label: 'Event reminders',
    description: 'notify me of calendar events the day before they happen',
    options: ['Yes (default)', 'No'],
  },
];

export default function NotificationsTabContent() {
  const [selectedOptions, setSelectedOptions] = useState(
    settings.reduce((acc, curr) => {
      acc[curr.label] = curr.options[0];
      return acc;
    }, {} as Record<string, string>)
  );

  const handleChange = (label: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div className="space-y-6">
      {settings.map((setting) => (
        <div key={setting.label}>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {setting.label}
            <span className="text-sm text-gray-500 font-normal ml-1">
              {setting.description}
            </span>
          </label>
          <select
            value={selectedOptions[setting.label]}
            onChange={(e) => handleChange(setting.label, e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-black"
          >
            {setting.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
