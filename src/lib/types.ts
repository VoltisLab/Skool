export interface CommunitySettings {
  name: string;
  description: string;
  url: string;
  isPrivate: boolean;
  supportEmail: string;
  icon?: string;
  cover?: string;
}

export interface SubscriptionStats {
  paidMembers: number;
  mrr: number;
  churnRate: number;
}

export interface TrafficStats {
  aboutPageVisitors: number;
  signups: number;
  conversionRate: number;
}

export interface OtherStats {
  oneTimeSales: number;
  trialsInProgress: number;
  trialConversionRate: number;
}

export interface PayoutInfo {
  accountBalance: number;
  nextPayoutAmount: number;
  nextPayoutDays: number;
  hasPendingPayouts: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  memberCount: number;
  isCurrent: boolean;
  hasFreeTrial: boolean;
}