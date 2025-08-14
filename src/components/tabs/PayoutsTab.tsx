import React from 'react';

const PayoutsTab: React.FC = () => {
  const payoutInfo = {
    accountBalance: 0.00,
    nextPayoutAmount: 0,
    nextPayoutDays: 6,
    hasPendingPayouts: false
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Payouts</h1>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <div className="w-5 h-5 text-gray-400">⚙️</div>
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${payoutInfo.accountBalance.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Account balance</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 mb-1">
              Next payout will be $0 in {payoutInfo.nextPayoutDays} days
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              $0 is pending 
              <div className="w-4 h-4 text-gray-400">ℹ️</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 py-8">
        No payouts yet
      </div>
    </div>
  );
};

export default PayoutsTab;