'use client';

import React from 'react';

export default function ChatTabContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Chat</h2>
        <p className="text-sm text-gray-600">
          Choose whether members of this group can message you or not.
        </p>
      </div>

      <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 max-w-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-black text-white text-xs flex items-center justify-center font-semibold">
            AIS
          </div>
          <span className="font-semibold text-sm">AI Automation Society</span>
        </div>

        <button className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          {/* Chat Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 15.75h6.75m-6.75-4.5h6.75m-10.5 7.5h13.5A2.25 2.25 0 0021 16.5V7.5A2.25 2.25 0 0018.75 5.25H5.25A2.25 2.25 0 003 7.5v9A2.25 2.25 0 005.25 18.75z"
            />
          </svg>
          <span className="text-gray-900">ON</span>

          {/* Chevron Down */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
