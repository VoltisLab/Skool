'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: typeof defaultSettings) => void;
  communityName: string;
}

const digestOptions = ['Off', 'Daily', 'Weekly'];
const emailFrequencyOptions = ['Off', 'Hourly', 'Daily'];
const postLikesOptions = ['Off', 'Notify me'];
const adminAnnouncementOptions = ['Yes', 'No'];
const eventReminderOptions = ['Yes (default)', 'No'];

const defaultSettings = {
  digestEmail: 'Weekly',
  notificationEmail: 'Hourly',
  postLikes: 'Notify me',
  adminAnnouncements: 'Yes',
  eventReminders: 'Yes (default)',
};

export default function CommunityNotificationSettingsModal({
  isOpen,
  onClose,
  onSave,
  communityName,
}: Props) {
  const modalRef = useRef<HTMLFormElement>(null);
  const [settings, setSettings] = useState(defaultSettings);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setSettings(defaultSettings); // Reset when opened
    setChanged(false);
  }, [isOpen]);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleChange = (key: keyof typeof settings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setChanged(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-6 border border-gray-200"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{communityName}</h2>
          <p className="text-sm text-gray-600">Notification settings</p>
        </div>

        <div className="space-y-4">
          <SettingItem
            title="Digest email frequency"
            description="A summary of popular posts and member activity when you don’t visit the group"
            value={settings.digestEmail}
            options={digestOptions}
            onChange={(val) => handleChange('digestEmail', val)}
          />
          <SettingItem
            title="Notifications email frequency"
            description="A bundled summary of unread likes, comments, mentions and activity for posts/members I follow"
            value={settings.notificationEmail}
            options={emailFrequencyOptions}
            onChange={(val) => handleChange('notificationEmail', val)}
          />
          <SettingItem
            title="Post likes notifications"
            description="Notify me when somebody likes my post"
            value={settings.postLikes}
            options={postLikesOptions}
            onChange={(val) => handleChange('postLikes', val)}
          />
          <SettingItem
            title="Admin announcements"
            description="Notify me when group admins make announcement posts"
            value={settings.adminAnnouncements}
            options={adminAnnouncementOptions}
            onChange={(val) => handleChange('adminAnnouncements', val)}
          />
          <SettingItem
            title="Event reminders"
            description="Notify me of calendar events the day before they happen"
            value={settings.eventReminders}
            options={eventReminderOptions}
            onChange={(val) => handleChange('eventReminders', val)}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-gray-500 hover:text-black"
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={!changed}
            className={`text-sm font-semibold text-white px-4 py-2 rounded-md ${
              changed
                ? 'bg-[#313273] hover:bg-[#2a2a5a]'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}

const SettingItem = ({
  title,
  description,
  value,
  options,
  onChange,
}: {
  title: string;
  description: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) => (
  <div>
    <p className="text-sm font-semibold text-gray-900">{title}</p>
    <p className="text-xs text-gray-500 mb-2">{description}</p>
    <select
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#313273]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
