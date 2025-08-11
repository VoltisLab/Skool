import React from "react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = ["Membership", "Notifications", "Chat", "Invite"];

export default function GroupModalSidebar({ activeTab, setActiveTab }: Props) {
  return (
    <div className="w-full lg:w-1/3 xl:w-1/4 border-r border-r-gray-300">
      {/* Header - hidden on mobile, visible on medium screens and up */}
      <div className="hidden md:block px-4 lg:px-6 pt-4 lg:pt-5 pb-2">
        <p className="font-bold text-sm lg:text-base truncate">AI Automation Society</p>
        <p className="text-xs lg:text-sm text-gray-400">Membership settings</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-row md:flex-col">
        {/* Mobile: Horizontal scroll container */}
        <div className="flex md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex flex-row space-x-1 px-4 py-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Desktop: Vertical navigation */}
        <div className="hidden md:flex md:flex-col">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 lg:px-6 py-3 lg:py-4 transition-all duration-200 text-sm lg:text-base font-medium ${
                activeTab === tab
                  ? "bg-black text-white font-semibold border-r-2 border-r-black"
                  : "hover:bg-gray-100 hover:border-r-2 hover:border-r-gray-300 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}