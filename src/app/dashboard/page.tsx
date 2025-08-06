'use client';

import { useState } from "react";
import ProtectedRoute from '@/components/ProtectedRoute'
import Sidebar from "@/components/Sidebar";
import Communities from "@/components/sections/Communities";
import Profile from "@/components/sections/Profile";
import Affiliates from "@/components/sections/Affiliates";
import Payouts from "@/components/sections/Payouts";
import Account from "@/components/sections/Account";
import Notifications from "@/components/sections/Notifications";
import Chat from "@/components/sections/Chat";
import PaymentMethods from "@/components/sections/PaymentMethods";
import PaymentHistory from "@/components/sections/PaymentHistory";
import Theme from "@/components/sections/Theme";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("communities");

  const renderContent = () => {
    switch (activeSection) {
      case "communities":
        return <Communities />;
      case "profile":
        return <Profile />;
      case "affiliates":
        return <Affiliates />;
      case "payouts":
        return <Payouts />;
      case "account":
        return <Account />;
      case "notifications":
        return <Notifications />;
      case "chat":
        return <Chat />;
      case "payment-methods":
        return <PaymentMethods />;
      case "payment-history":
        return <PaymentHistory />;
      case "theme":
        return <Theme />;
      default:
        return <Communities />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Centered layout container */}
      <div className="max-w-[1085px] mx-auto flex lg:flex-row flex-col">
        {/* Sidebar - remains visible on md+ and toggled on mobile */}
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
