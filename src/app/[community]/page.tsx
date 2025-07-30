// src/app/[community]/page.tsx
import React from "react";

interface CommunityPageProps {
  params: {
    community: string;
  };
}

export default function CommunityPage({ params }: CommunityPageProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Welcome to {decodeURIComponent(params.community)}</h2>
      <p>This is the main page for the community.</p>
    </div>
  );
}
