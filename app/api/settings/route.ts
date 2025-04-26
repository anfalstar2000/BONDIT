import { NextResponse } from "next/server";

export interface UserSettings {
  id: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    inApp: boolean;
    marketing: boolean;
    orderUpdates: boolean;
    accountAlerts: boolean;
  };
  privacy: {
    dataSharing: boolean;
    profileVisibility: "public" | "private" | "contacts";
    activityTracking: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "system";
    fontSize: "small" | "medium" | "large";
    compactView: boolean;
  };
  language: string;
  timezone: string;
}

export interface LoyaltyProgramSettings {
  id: string;
  programName: string;
  pointsName: string;
  pointsAbbreviation: string;
  conversionRate: number;
  earningRules: {
    id: string;
    action: string;
    points: number;
    isActive: boolean;
    maxFrequency?: {
      period: "daily" | "weekly" | "monthly" | "yearly";
      limit: number;
    };
  }[];
  expirationPolicy: {
    enabled: boolean;
    periodMonths: number;
  };
  tiers: {
    name: string;
    threshold: number;
    multiplier: number;
    benefits: string[];
  }[];
}

const mockUserSettings: UserSettings = {
  id: "settings-user-001",
  notifications: {
    email: true,
    push: true,
    sms: false,
    inApp: true,
    marketing: false,
    orderUpdates: true,
    accountAlerts: true
  },
  privacy: {
    dataSharing: true,
    profileVisibility: "contacts",
    activityTracking: true
  },
  appearance: {
    theme: "system",
    fontSize: "medium",
    compactView: false
  },
  language: "en-US",
  timezone: "America/New_York"
};

const mockLoyaltyProgramSettings: LoyaltyProgramSettings = {
  id: "settings-loyalty-001",
  programName: "BondIt Rewards",
  pointsName: "Stars",
  pointsAbbreviation: "⭐",
  conversionRate: 100, // 100 points = $1
  earningRules: [
    {
      id: "rule-001",
      action: "Purchase",
      points: 10, // per $1 spent
      isActive: true
    },
    {
      id: "rule-002",
      action: "Review",
      points: 50,
      isActive: true,
      maxFrequency: {
        period: "daily",
        limit: 3
      }
    },
    {
      id: "rule-003",
      action: "Social Share",
      points: 25,
      isActive: true,
      maxFrequency: {
        period: "weekly",
        limit: 5
      }
    },
    {
      id: "rule-004",
      action: "Referral",
      points: 500,
      isActive: true
    },
    {
      id: "rule-005",
      action: "Birthday",
      points: 250,
      isActive: true,
      maxFrequency: {
        period: "yearly",
        limit: 1
      }
    }
  ],
  expirationPolicy: {
    enabled: true,
    periodMonths: 12
  },
  tiers: [
    {
      name: "Bronze",
      threshold: 0,
      multiplier: 1,
      benefits: ["Basic rewards", "Birthday gift"]
    },
    {
      name: "Silver",
      threshold: 1000,
      multiplier: 1.25,
      benefits: ["5% bonus points", "Exclusive promotions", "Priority support"]
    },
    {
      name: "Gold",
      threshold: 5000,
      multiplier: 1.5,
      benefits: ["10% bonus points", "Free shipping", "Early access to sales"]
    },
    {
      name: "Platinum",
      threshold: 10000,
      multiplier: 2,
      benefits: ["15% bonus points", "Personal shopper", "VIP events", "Gift wrapping"]
    },
    {
      name: "Diamond",
      threshold: 25000,
      multiplier: 3,
      benefits: ["20% bonus points", "Concierge service", "Exclusive products", "Free returns"]
    }
  ]
};

export async function GET() {
  return NextResponse.json({
    user: mockUserSettings,
    loyaltyProgram: mockLoyaltyProgramSettings
  });
} 