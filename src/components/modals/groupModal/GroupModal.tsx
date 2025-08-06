"use client";

import React, { useState } from "react";
import GroupModalSidebar from "./GroupModalSideBar";
import GroupModalContent from "./GroupModalContent";
import { X } from "lucide-react";

const TABS = ["Membership", "Notifications", "Chat", "Invite"];

export default function GroupModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("Membership");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-120 flex flex-col overflow-hidden">
        {/* Header (Mobile) */}
        <div className=" flex justify-between items-center px-4 py-3 border-b border-b-gray-300">
          <div>
            <p className="font-bold text-sm">AI Automation Society</p>
            <p className="text-xs text-gray-400">Membership settings</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

<div className="flex flex-col md:flex-row  h-full overflow-y-auto">

        {/* Sidebar */}
        <GroupModalSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main content */}
        <GroupModalContent activeTab={activeTab} />

        {/* Close button (Desktop) */}
        <button
          onClick={onClose}
          className="hidden md:block absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
</div>
      </div>
    </div>
  );
}
