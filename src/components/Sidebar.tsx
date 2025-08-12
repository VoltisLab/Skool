"use client";

import { useState } from "react";
import {
  Users,
  User,
  Share2,
  CreditCard,
  Settings,
  Bell,
  MessageCircle,
  Wallet,
  History,
  Palette,
} from "lucide-react";
interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: "communities", label: "Communities", icon: Users },
  { id: "profile", label: "Profile", icon: User },
  { id: "affiliates", label: "Affiliates", icon: Share2 },
  { id: "payouts", label: "Payouts", icon: CreditCard },
  { id: "account", label: "Account", icon: Settings },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "payment-methods", label: "Payment methods", icon: Wallet },
  { id: "payment-history", label: "Payment history", icon: History },
  { id: "theme", label: "Theme", icon: Palette },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="w-64 bg-gray-50 min-h-screen p-4">
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive 
                  ? 'bg-black text-white bg-opacity-20 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
} 