import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { timezones } from '@/lib/data';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import UpdateEmailModal from '../modals/UpdateEmailModal';
import LogoutModal from '../auth/LogoutModal';
import { useAuth } from '@/lib/contexts/AuthContext';

// Mock timezone data


const Account: React.FC = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
    const [isEmailOpen, setEmailIsOpen] = useState(false);
    const [isLogout, setIsLogOut] = useState(false)
  const {user} = useAuth()

  // Filter timezones based on search term
  const filteredTimezones = timezones.filter(tz =>
    tz.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const handleTimezoneSelect = (timezone: typeof timezones[0]) => {
    setSelectedTimezone(timezone);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setSearchTerm('');
  };

  return (
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  <h1 className="text-2xl font-bold text-gray-900 mb-6">Account</h1>

  {/* Email Section */}
  <div className="mb-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Email</h2>
        <p className="text-sm text-gray-900 break-all">{user?.email}</p>
      </div>
      <button
        onClick={() => setEmailIsOpen(true)}
        className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 border border-gray-300 rounded-md hover:text-black hover:bg-gray-100 transition-colors w-full sm:w-auto"
      >
        CHANGE EMAIL
      </button>
    </div>
  </div>

  {/* Password Section */}
  <div className="mb-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Password</h2>
        <p className="text-sm text-gray-900">Change your password</p>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 border border-gray-300 rounded-md hover:text-black hover:bg-gray-100 transition-colors w-full sm:w-auto"
      >
        CHANGE PASSWORD
      </button>
    </div>
  </div>

  {/* Timezone Section */}
  <div className="mb-6">
    <h2 className="text-base font-bold text-gray-900 mb-3">Timezone</h2>
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full h-12 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-between group"
      >
        <span className="truncate text-left">{selectedTimezone.label}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[18rem] overflow-y-auto">
          <div className="p-3 border-b border-gray-200">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search timezones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            {filteredTimezones.length > 0 ? (
              filteredTimezones.map((timezone) => (
                <button
                  key={timezone.value}
                  onClick={() => handleTimezoneSelect(timezone)}
                  className="w-full px-4 py-3 text-sm text-left hover:bg-black hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{timezone.label}</span>
                  {selectedTimezone.value === timezone.value && (
                    <Check className="w-4 h-4 text-white ml-2" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">No timezones found</div>
            )}
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Logout Section */}
  <div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Log out of all devices</h2>
        <p className="text-sm text-gray-600">Log out of all active sessions on all devices.</p>
      </div>
      <button
        onClick={() => setIsLogOut(true)}
        className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 border border-gray-300 rounded-md hover:text-black hover:bg-gray-100 transition-colors w-full sm:w-auto"
      >
        LOG OUT EVERYWHERE
      </button>
    </div>
  </div>

  {/* Modals */}
  <ChangePasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  <UpdateEmailModal isOpen={isEmailOpen} onClose={() => setEmailIsOpen(false)} />
  <LogoutModal
    isOpen={isLogout}
    onClose={() => setIsLogOut(false)}
    onConfirm={() => (window.location.href = "/login")}
  />
</div>

  );
};

export default Account;