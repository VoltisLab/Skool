import React from "react";
import ChatTabContent from "./ChatContent";
import InviteTabContent from "./InviteContent";
import NotificationsTabContent from "./NotificationContent";

interface Props {
  activeTab: string;
}

export default function GroupModalContent({ activeTab }: Props) {
  return (
    <div className="w-full md:w-2/3 p-6 space-y-4">
      {activeTab === "Membership" && (
        <>
          <h2 className="text-lg font-bold">Membership</h2>
          <p className="text-sm text-gray-700">
            You’ve been a member of AI Automation Society since{" "}
            <span className="font-bold">07/30/2025</span>.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded">
            LEAVE THIS GROUP
          </button>
        </>
      )}

      {activeTab === "Notifications" && (
        <NotificationsTabContent/>
      )}

      {activeTab === "Chat" && (
        <ChatTabContent/>
      )}

      {activeTab === "Invite" && (
        <InviteTabContent/>
      )}
    </div>
  );
}
