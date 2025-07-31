'use client';

import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaChevronDown } from 'react-icons/fa';
import { BiMessageRounded } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DropdownPanel from '../DropdownPanel';

export default function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentTab = segments[segments.length - 1] ?? "";

  const tabs = [
    { name: 'Community', link: '/community' },
    { name: 'Classroom', link: '/classroom' },
    { name: 'Calendar', link: '/calendar' },
    { name: 'Members', link: '/members' },
    { name: 'Map', link: '/map' },
    { name: 'Leaderboards', link: '/leaderboards' },
    { name: 'About', link: '/about' },
  ];

  return (
    <header className="w-full bg-white border-b border-b-gray-200 py-3 flex flex-col items-center relative z-50">
      {/* Top Bar */}
      <div className="flex w-[78%] items-center justify-center gap-3 py-2 relative">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <div className="bg-black w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-base">AIS</span>
          </div>
          <span className="text-base font-semibold">AI Automation Society</span>
          <FaChevronDown className="text-gray-500 text-xs mt-[1px]" />
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-full">
          <div className="flex items-center bg-gray-200 rounded-md px-3 py-4">
            <HiOutlineSearch size={24} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-base px-2 w-full"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 relative">
          {/* Chat Icon */}
          <div className="relative">
            <BiMessageRounded
              size={24}
              className="text-gray-500 cursor-pointer"
              onClick={() => {
                if (isChatOpen) {
                  setIsChatOpen(false);
                } else {
                  setIsChatOpen(true);
                  setIsNotificationOpen(false);
                  setIsProfileOpen(false);
                }
              }}
            />
            <DropdownPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)}>
              <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-200">
                <h3 className="font-semibold text-base">Chats</h3>
                <span className="text-base text-blue-500 cursor-pointer">All</span>
              </div>
              <div className="p-2 border-b border-b-gray-200">
                <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                  <HiOutlineSearch className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search users"
                    className="text-base bg-transparent outline-none w-full"
                  />
                </div>
              </div>
              <div className="p-4 text-center text-base text-gray-400">No chats yet</div>
            </DropdownPanel>
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <IoNotificationsOutline
              size={24}
              className="text-gray-500 cursor-pointer"
              onClick={() => {
                if (isNotificationOpen) {
                  setIsNotificationOpen(false);
                } else {
                  setIsNotificationOpen(true);
                  setIsChatOpen(false);
                  setIsProfileOpen(false);
                }
              }}
            />
            <DropdownPanel isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
              <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-200">
                <h3 className="font-semibold text-base">Notifications</h3>
                <span className="text-base text-blue-500 cursor-pointer">Mark all read</span>
              </div>
              <div className="p-4 text-center text-base text-gray-400">No notifications yet</div>
            </DropdownPanel>
          </div>

          {/* Profile Image & Dropdown */}
          <div className="relative">
            <div className="relative cursor-pointer h-[30px] w-[30px]" onClick={() => {
              if (isProfileOpen) {
                setIsProfileOpen(false);
              } else {
                setIsProfileOpen(true);
                setIsChatOpen(false);
                setIsNotificationOpen(false);
              }
            }}>
            <Image
                src="/img1.jpg"
                alt="Profile"
                fill
                className="rounded-full bg-black object-cover"
            />
            </div>
            <DropdownPanel isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} align="right" type="profile">
                <div className=' space-y-2'>

              <div className="p-4 border-b border-b-gray-200 font-semibold text-base truncate">
                kawekwuneemmanuel20...
              </div>
              <ul className="text-base px-4 py-2 space-y-4">
                <li className="cursor-pointer hover:underline">Profile</li>
                <li className="cursor-pointer hover:underline">Settings</li>
                <li className="cursor-pointer hover:underline">Affiliates</li>
              </ul>
              <hr className='bg-gray-200 text-gray-200' />
              <ul className="text-base px-4 py-2 space-y-2 text-gray-400">
                <li className="cursor-not-allowed">Help center</li>
                <li className="cursor-not-allowed">Create a community</li>
                <li className="cursor-not-allowed">Discover communities</li>
              </ul>
              <div className="px-4 pb-3 pt-2">
                <button className="text-base text-red-500 hover:underline">Log out</button>
              </div>
                </div>
            </DropdownPanel>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex gap-6 mt-1 w-[78%]">
        {tabs.map((tab) => {
          const isActive = pathname === tab.link;

          return (
            <Link href={tab.link} prefetch key={tab.name}>
              <span
                className={`text-base cursor-pointer ${
                  isActive
                    ? 'font-semibold border-b-4 border-black pb-3 text-black'
                    : 'text-gray-500'
                }`}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}