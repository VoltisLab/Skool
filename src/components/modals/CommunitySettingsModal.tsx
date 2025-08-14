import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CommunitySettings } from '@/lib/types';
import DashboardTab from '../tabs/DashboardTab';
import InviteTab from '../tabs/InviteTab';
import GeneralTab from '../tabs/GeneralTab';
import PayoutsTab from '../tabs/PayoutsTab';
import PricingTab from '../tabs/PricingTab';
import AffiliatesSection from '../tabs/AffiliatesTab';
import PluginsSection from '../tabs/PluginsTab';
import TabsSection from '../tabs/TabsTab';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityData: CommunitySettings;
  onSave: (data: CommunitySettings) => void;
}

type TabType = 'Dashboard' | 'Invite' | 'General' | 'Payouts' | 'Pricing' | 'Affiliates' | 'Plugins' | 'Tabs' | 'Categories' | 'Rules' | 'Discovery' | 'Metrics' | 'Billing';

const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose, communityData, onSave }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Dashboard');
  const [settings, setSettings] = useState<CommunitySettings>(communityData);

  const tabs: TabType[] = [
    'Dashboard', 'Invite', 'General', 'Payouts', 'Pricing', 'Affiliates', 
    'Plugins', 'Tabs', 'Categories', 'Rules', 'Discovery', 'Metrics', 'Billing'
  ];

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardTab />;
      case 'Invite':
        return <InviteTab communityUrl={settings.url} />;
      case 'General':
        return <GeneralTab settings={settings} onChange={setSettings} />;
      case 'Payouts':
        return <PayoutsTab />;
      case 'Pricing':
        return <PricingTab />;
      case 'Affiliates':
        return <AffiliatesSection />;
      case 'Plugins':
        return <PluginsSection />;
      case 'Tabs':
        return <TabsSection />;
      case 'Categories':
        return <TabsSection />;
      default:
        return (
          <div className="p-6 text-gray-500">
            {activeTab} tab content coming soon...
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className=" bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white font-semibold">
              N
            </div>
            <div>
              <h2 className="text-lg font-semibold">NewCommunity</h2>
              <p className="text-sm text-gray-500">Group settings</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar */}
        <div className='flex'>
        <div className="w-64  border-r border-gray-200 pt-5 pb-6">
          <nav className="px-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-lg mb-1 transition-colors font-bold hover:bg-yellow-200 ${
                  activeTab === tab
                    ? 'bg-yellow-200 '
                    : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 pt-5 overflow-y-auto">
          {renderTabContent()}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityModal;