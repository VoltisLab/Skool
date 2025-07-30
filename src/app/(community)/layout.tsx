import React from "react";
import type { Metadata } from "next";
import Header from "@/components/community/Header";

export const metadata: Metadata = {
  title: "Community Page",
  description: "This is a dynamic community layout",
};

interface CommunityLayoutProps {
  children: React.ReactNode;
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <div className="h-full">
    
      <Header/>

      <main className="p-6 bg-[rgb(248,247,245)] h-full">{children}</main>
    </div>
  );
}
