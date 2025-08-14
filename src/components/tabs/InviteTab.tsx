import React, { useState } from 'react';
import { Copy } from 'lucide-react';

interface InviteTabProps {
  communityUrl: string;
}

const InviteTab: React.FC<InviteTabProps> = ({ communityUrl }) => {
  const [email, setEmail] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  
  const shareUrl = `https://www.skool.com/${communityUrl}/about?ref=95404fbc87654f0ba704ec9`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSendInvite = () => {
    if (email) {
      console.log('Sending invite to:', email);
      setEmail('');
    }
  };

  const handleImportCSV = () => {
    console.log('Import CSV clicked');
  };

  const handleZapierIntegration = () => {
    console.log('Zapier integration clicked');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Share your group link</h2>
        <p className="text-gray-600 mb-4">
          This will take people to your group&apos;s About page where they can purchase or request membership.
        </p>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-blue-600"
          />
          <button
            onClick={handleCopy}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copySuccess ? 'COPIED!' : 'COPY'}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          These invite methods will grant instant access without purchasing or requesting membership.
        </p>
        
        <div className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendInvite}
            disabled={!email}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
          >
            SEND
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">
          This member will have access to <span className="text-blue-600">(0/0 courses)</span>.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Import .CSV file</h3>
              <p className="text-sm text-gray-500">Invite members in bulk by uploading a .CSV file of email addresses.</p>
            </div>
          </div>
          <button
            onClick={handleImportCSV}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
          >
            IMPORT
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <div className="text-white font-bold text-lg">⚡</div>
            </div>
            <div>
              <h3 className="font-medium">Zapier integration</h3>
              <p className="text-sm text-gray-500">Invite members by connecting Skool to over 500 tools using Zapier.</p>
            </div>
          </div>
          <button
            onClick={handleZapierIntegration}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
          >
            INTEGRATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteTab;
