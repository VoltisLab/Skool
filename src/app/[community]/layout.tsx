// src/app/[community]/layout.tsx
import React from "react";
import type { Metadata } from "next";
import Header from "@/components/community/Header";

export const metadata: Metadata = {
  title: "Community Page",
  description: "This is a dynamic community layout",
};

interface CommunityLayoutProps {
  children: React.ReactNode;
  params: {
    community: string;
  };
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <div>
    
      <Header/>

      <main className="p-6">{children}</main>
    </div>
  );
}
