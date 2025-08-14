import React, { useState } from 'react';

const TabsSection = () => {
  const [tabs, setTabs] = useState([
    {
      id: 'classroom',
      name: 'Classroom',
      enabled: true,
      description: 'Organize useful information to help your community do whatever they want to do.',
      subDescription: 'Some people use this space for guides, instructions, courses, recipes, workout plans, resources, templates, etc.'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      enabled: true,
      description: 'One of the fastest ways to build community is to get members together to hangout live on Zoom, Google Meet, or in-person.',
      subDescription: 'Some people use this for coffee hours, Q&As, co-working, happy hour, etc.'
    },
    {
      id: 'map',
      name: 'Map',
      enabled: true,
      description: 'Display member locations on a world map to help facilitate in-person meetups.',
      subDescription: ''
    }
  ]);

  const toggleTab = (tabId: string) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId ? { ...tab, enabled: !tab.enabled } : tab
    ));
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tabs</h2>
      <p className="text-gray-600 mb-6">Show/hide tabs in your community.</p>
      
      <div className="space-y-6">
        {tabs.map((tab) => (
          <div key={tab.id} className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h3 className="font-semibold text-gray-900 mb-2">{tab.name}</h3>
              <p className="text-gray-700 text-sm mb-1">{tab.description}</p>
              {tab.subDescription && (
                <p className="text-gray-600 text-sm">{tab.subDescription}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-green-600">On</span>
              <button
                onClick={() => toggleTab(tab.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  tab.enabled ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tab.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsSection;