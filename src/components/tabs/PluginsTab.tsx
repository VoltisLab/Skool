import React from 'react';
import { HelpCircle, MessageCircle, Hammer, MessageSquare, Video, Zap, Target, PlayCircle, Shield } from 'lucide-react';

const PluginsSection = () => {
  const plugins = [
    {
      icon: HelpCircle,
      iconBg: 'bg-blue-500',
      title: 'Membership questions',
      status: 'Off',
      description: 'Ask members questions when they request access to your group.',
      isPro: false
    },
    {
      icon: MessageCircle,
      iconBg: 'bg-purple-500',
      title: 'Unlock chat at Level 2 or 3',
      status: 'Off',
      description: 'Reduce DM spam by requiring members to be at Level 2 to chat.',
      isPro: false
    },
    {
      icon: Hammer,
      iconBg: 'bg-red-900',
      title: 'Unlock posting at Level 2 or 3',
      status: 'Off',
      description: 'Reduce low quality posts by requiring members to be at Level 2 to post.',
      isPro: false
    },
    {
      icon: MessageSquare,
      iconBg: 'bg-orange-500',
      title: 'Auto DM new members',
      status: 'Off',
      description: 'Send an automated DM to new group members.',
      isPro: true
    },
    {
      icon: Video,
      iconBg: 'bg-blue-400',
      title: 'Onboarding video',
      status: 'On',
      description: 'Welcome new members with a custom onboarding video.',
      isPro: true
    },
    {
      icon: Zap,
      iconBg: 'bg-red-500',
      title: 'Zapier integration',
      status: 'Off',
      description: 'Invite members, unlock courses, and send membership questions to your CRM.',
      isPro: true
    },
    {
      icon: Target,
      iconBg: 'bg-blue-600',
      title: 'Meta pixel tracking',
      status: 'Off',
      description: 'Run FB/IG ads to your about page, retarget visitors, and track signups with precision.',
      isPro: true
    },
    {
      icon: PlayCircle,
      iconBg: 'bg-red-600',
      title: 'Cancellation video',
      status: 'Off',
      description: 'Retain members by showing them a video on the cancel page.',
      isPro: true
    }
  ];

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Plugins</h2>
      
      <div className="space-y-4">
        {plugins.map((plugin, index) => {
          const IconComponent = plugin.icon;
          return (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-lg ${plugin.iconBg} flex items-center justify-center`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{plugin.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    plugin.status === 'On' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    ({plugin.status})
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{plugin.description}</p>
              </div>
              
              {plugin.isPro && (
                <div className="flex items-center space-x-1 text-gray-400">
                  <span className="text-xs font-medium">Pro</span>
                  <Shield className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PluginsSection;