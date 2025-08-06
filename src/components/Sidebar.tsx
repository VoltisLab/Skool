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
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <>
      {/* Hamburger menu button for small screens */}
      <div className="md:hidden p-4 flex items-center justify-between">
        <button onClick={toggleSidebar}>
          <Menu className="h-6 w-6 text-gray-800" />
        </button>
        <span className="text-lg font-semibold">Settings</span>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 bg-gray-50 min-h-screen p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-[#313273] text-white bg-opacity-20 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile sidebar with backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 w-64 bg-white z-50 h-full shadow-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={closeSidebar}>
                  <X className="h-5 w-5 text-gray-700" />
                </button>
              </div>
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSectionChange(item.id);
                        closeSidebar();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-[#313273] text-white bg-opacity-20 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
