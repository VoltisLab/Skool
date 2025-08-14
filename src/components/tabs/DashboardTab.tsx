import React from 'react';

const DashboardTab: React.FC = () => {
  const subscriptionStats = {
    paidMembers: 0,
    mrr: 0,
    churnRate: 0.0
  };

  const trafficStats = {
    aboutPageVisitors: 0,
    signups: 1,
    conversionRate: 0.0
  };

  const otherStats = {
    oneTimeSales: 0,
    trialsInProgress: 0,
    trialConversionRate: 0.0
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          🎉 Happy Thursday, Miracle
        </h1>
        <div className="text-sm text-gray-500">
          Last updated just now
        </div>
      </div>

      {/* Subscriptions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Subscriptions</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">{subscriptionStats.paidMembers}</div>
            <div className="text-sm text-gray-500 mt-1">Paid members</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">${subscriptionStats.mrr}</div>
            <div className="text-sm text-gray-500 mt-1">MRR</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">{subscriptionStats.churnRate}%</div>
            <div className="text-sm text-gray-500 mt-1">Churn (last 30d)</div>
          </div>
        </div>
      </div>

      {/* Traffic */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Traffic (last 7 days)</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">{trafficStats.aboutPageVisitors}</div>
            <div className="text-sm text-gray-500 mt-1">About page visitors</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">{trafficStats.signups}</div>
            <div className="text-sm text-gray-500 mt-1">Signups</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">{trafficStats.conversionRate}%</div>
            <div className="text-sm text-gray-500 mt-1">Conversion rate</div>
          </div>
        </div>
      </div>

      {/* Other */}
      <div>
        <h2 className="text-lg font-medium mb-4">Other</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">${otherStats.oneTimeSales}</div>
            <div className="text-sm text-gray-500 mt-1">1-time sales</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">{otherStats.trialsInProgress}</div>
            <div className="text-sm text-gray-500 mt-1">Trials in progress</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">{otherStats.trialConversionRate}%</div>
            <div className="text-sm text-gray-500 mt-1">Trial conversion rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
