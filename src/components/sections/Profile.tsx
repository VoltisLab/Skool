'use client';

import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ChangeNameModal from '../modals/ChangeNameModal';

export default function Profile() {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('Stanley');
  const [lastName, setLastName] = useState('Samuel');
  const [expandedSections, setExpandedSections] = useState({
    socialLinks: true,
    membershipVisibility: false,
    advanced: false
  })
  const [isLocationFocused, setIsLocationFocused] = useState(false)
  const [focusedSocialField, setFocusedSocialField] = useState<string | null>(null)

  const handleNameSave = (newFirstName: string, newLastName: string) => {
    setFirstName(newFirstName);
    setLastName(newLastName);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      {/* Profile Photo */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src="/head.jpg"
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <button className="text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors">
          Change profile photo
        </button>
      </div>

      {/* Name Fields */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              readOnly
              className="w-full px-3 py-3 border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-gray-400 cursor-not-allowed pointer-events-none"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              readOnly
              className="w-full px-3 py-3 border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-gray-400 cursor-not-allowed pointer-events-none"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">
          You can only change your name once, and you must use your real name.{' '}
          <button
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setIsNameModalOpen(true)}
          >
            Change name.
          </button>
        </p>
      </div>

      {/* URL Field */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            URL
          </label>
          <input
            type="text"
            defaultValue="skool.com/@stanley-samuel-2133"
            readOnly
            className="w-full px-3 py-3 border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-gray-400 cursor-not-allowed pointer-events-none"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          You can change your URL once you've got 90 contributions, 30 followers, and been using it for 90 days.
        </p>
      </div>

      {/* Bio Field */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            Bio
          </label>
          <textarea
            defaultValue="Software Engineer"
            rows={3}
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 resize-none"
          />
        </div>
        <div className="text-right mt-1">
          <span className="text-sm text-gray-400">17 / 150</span>
        </div>
      </div>

      {/* Location Field */}
      <div className="mb-8">
        <div className="relative">
          <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
            isLocationFocused ? 'opacity-100' : 'opacity-0'
          }`}>
            Location
          </label>
          <input
            type="text"
            placeholder={isLocationFocused ? "" : "Location"}
            onFocus={() => setIsLocationFocused(true)}
            onBlur={() => setIsLocationFocused(false)}
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-2">
          <button className="flex items-center gap-2 text-blue-600 text-sm hover:text-blue-700">
            <MapPin className="w-4 h-4" />
            Change my map location
          </button>
          <button className="text-gray-500 text-sm hover:text-gray-700">
            Remove my map location
          </button>
        </div>
      </div>

      {/* Myers Briggs */}
      <div className="mb-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 z-10">
            Myers Briggs
          </label>
          <div className="relative">
            <select className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 appearance-none bg-white">
              <option>Don't show</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="mb-4">
        <div 
          className="flex items-center mb-4 gap-2 cursor-pointer transition-colors"
          onClick={() => toggleSection('socialLinks')}
        >
          <span className="font-medium text-gray-900 text-sm">Social links</span>
          {expandedSections.socialLinks ? (
            <ChevronUp className="w-4 h-4 text-gray-800" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-800" />
          )}
        </div>
        
          {expandedSections.socialLinks && (
            <div className=" border-t-0 rounded-b-lg space-y-4">
              <div className="relative">
                <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                  focusedSocialField === 'website' ? 'opacity-100' : 'opacity-0'
                }`}>
                  Website
                </label>
                <input
                  type="text"
                  placeholder={focusedSocialField === 'website' ? "" : "Website"}
                  onFocus={() => setFocusedSocialField('website')}
                  onBlur={() => setFocusedSocialField(null)}
                  className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="relative">
                <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                  focusedSocialField === 'instagram' ? 'opacity-100' : 'opacity-0'
                }`}>
                  Instagram
                </label>
                <input
                  type="text"
                  placeholder={focusedSocialField === 'instagram' ? "" : "Instagram"}
                  onFocus={() => setFocusedSocialField('instagram')}
                  onBlur={() => setFocusedSocialField(null)}
                  className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="relative">
                <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                  focusedSocialField === 'x' ? 'opacity-100' : 'opacity-0'
                }`}>
                  X
                </label>
                <input
                  type="text"
                  placeholder={focusedSocialField === 'x' ? "" : "X"}
                  onFocus={() => setFocusedSocialField('x')}
                  onBlur={() => setFocusedSocialField(null)}
                  className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="relative">
                <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                  focusedSocialField === 'youtube' ? 'opacity-100' : 'opacity-0'
                }`}>
                  YouTube
                </label>
                <input
                  type="text"
                  placeholder={focusedSocialField === 'youtube' ? "" : "YouTube"}
                  onFocus={() => setFocusedSocialField('youtube')}
                  onBlur={() => setFocusedSocialField(null)}
                  className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="relative">
                <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                  focusedSocialField === 'linkedin' ? 'opacity-100' : 'opacity-0'
                }`}>
                  LinkedIn
                </label>
                <input
                  type="text"
                  placeholder={focusedSocialField === 'linkedin' ? "" : "LinkedIn"}
                  onFocus={() => setFocusedSocialField('linkedin')}
                  onBlur={() => setFocusedSocialField(null)}
                  className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>
              <div className="relative">
                <label className={`absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 transition-all duration-200 ${
                  focusedSocialField === 'facebook' ? 'opacity-100' : 'opacity-0'
                }`}>
                  Facebook
                </label>
                <input
                  type="text"
                  placeholder={focusedSocialField === 'facebook' ? "" : "Facebook"}
                  onFocus={() => setFocusedSocialField('facebook')}
                  onBlur={() => setFocusedSocialField(null)}
                  className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>
          )}
      </div>

      {/* Membership Visibility Section */}
      <div className="mb-4">
        <div 
          className="flex items-center mb-4 gap-2 transition-colors"
          onClick={() => toggleSection('membershipVisibility')}
        >
          <span className="font-medium text-gray-900 text-sm">Membership visibility</span>
          {expandedSections.membershipVisibility ? (
            <ChevronUp className="w-4 h-4 text-gray-800" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-800" />
          )}
        </div>
        
        {expandedSections.membershipVisibility && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-4">
            <p className="text-sm text-gray-600 mb-4">Control what groups show on your profile.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AIS</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Automation Society</h4>
                    <p className="text-sm text-gray-500">Public • 109.2k members</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-green-600 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AAA</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Automation (A-Z)</h4>
                    <p className="text-sm text-gray-500">Private • 81.1k members</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-green-600 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Automation Agency Hub</h4>
                    <p className="text-sm text-gray-500">Private • 217.6k members</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-green-600 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Section */}
      <div className="mb-4">
        <div 
          className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('advanced')}
        >
          <span className="font-medium text-gray-900 text-sm">Advanced</span>
          {expandedSections.advanced ? (
            <ChevronUp className="w-4 h-4 text-gray-800" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-800" />
          )}
        </div>
        
        {expandedSections.advanced && (
          <div className="border-t-0 rounded-b-lg ">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">Hide profile from search engines</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Name Modal */}
      <ChangeNameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSave={handleNameSave}
        currentFirstName={firstName}
        currentLastName={lastName}
      />
    </div>
  );
}
