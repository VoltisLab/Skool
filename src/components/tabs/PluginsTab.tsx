import React from 'react';
import { HelpCircle, MessageCircle, Hammer, MessageSquare, Video, Zap, Target, PlayCircle, Link, CheckCircle, Webhook } from 'lucide-react';

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
    },
    {
      icon: Target,
      iconBg: 'bg-yellow-500',
      title: 'Google ads tracking',
      status: 'Off',
      description: 'Run Google/YouTube ads to your about page, retarget visitors, and track signups.',
      isPro: true
    },
    {
      icon: Link,
      iconBg: 'bg-yellow-400',
      title: 'Links',
      status: 'Off',
      description: 'Share important resources by adding links to your group info box.',
      isPro: true
    },
    {
      icon: CheckCircle,
      iconBg: 'bg-green-500',
      title: 'Instant membership approval',
      status: 'Off',
      description: 'Auto-approve membership requests so members get instant access.',
      isPro: true
    },
    {
      icon: Webhook,
      iconBg: 'bg-gray-600',
      title: 'Webhook',
      status: 'Off',
      description: 'Invite members to your group with a simple webhook.',
      isPro: true
    }
  ];

  return (
    <div className="px-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Plugins</h2>
      
      <div className="space-y-1 overflow-y-scroll">
        {plugins.map((plugin, index) => {
          const IconComponent = plugin.icon;
          return (
            <div key={index} className="flex items-center space-x-4 py-3 rounded-lgtransition-colors">
              <div className={`w-10 h-10 rounded-lg ${plugin.iconBg} flex items-center justify-center`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{plugin.title}</h3>
                  <span className={`p-1 py-2 text-xs rounded-full font-bold ${
                    plugin.status === 'On' 
                      ? ' text-green-600' 
                      : 'text-gray-600'
                  }`}>
                    ({plugin.status})
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{plugin.description}</p>
              </div>
              
              {plugin.isPro && (
                <div className="p-1 rounded-full  text-gray-400">
                  <span className="text-xs font-medium p-1 rounded-full border border-gray-400">Pro</span>
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