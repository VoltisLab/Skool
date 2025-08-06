'use client';

import React, { useState } from 'react';

export default function InviteTabContent() {
  const [copied, setCopied] = useState(false);

  const inviteLink = 'https://www.skool.com/ai-automation-society/about';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Invite</h2>
        <p className="text-sm text-gray-600">
          Share a link to AI Automation Society with your friends.
        </p>
      </div>

      <div className="flex items-center max-w-xl border border-gray-300 rounded-md overflow-hidden">
        <a
          href={inviteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold text-sm px-4 py-2 break-all truncate"
        >
          {inviteLink}
        </a>

        <button
          onClick={handleCopy}
          className="bg-[#313273] hover:bg-[#313e73] text-white font-semibold text-sm px-4 py-2"
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
    </div>
  );
}
