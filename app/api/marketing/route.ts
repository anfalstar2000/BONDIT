import { NextResponse } from "next/server";

export interface Campaign {
  id: string;
  name: string;
  type: "email" | "push" | "sms" | "in-app";
  status: "draft" | "scheduled" | "active" | "completed" | "paused";
  audience: {
    segmentId: string;
    segmentName: string;
    estimatedReach: number;
  };
  content: {
    subject?: string;
    title?: string;
    body: string;
    imageUrl?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  schedule: {
    startDate: string;
    endDate?: string;
    frequency?: "one-time" | "daily" | "weekly" | "monthly";
  };
  performance?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
  };
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  criteria: {
    type: string;
    operator: string;
    value: string | number | boolean;
  }[];
  lastUpdated: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "camp-001",
    name: "Summer Sale Announcement",
    type: "email",
    status: "completed",
    audience: {
      segmentId: "seg-001",
      segmentName: "All Customers",
      estimatedReach: 25000
    },
    content: {
      subject: "Summer Sale - Up to 50% Off!",
      body: "Our biggest summer sale is here! Enjoy up to 50% off on selected items.",
      imageUrl: "/images/campaigns/summer-sale.jpg",
      ctaText: "Shop Now",
      ctaUrl: "/sale"
    },
    schedule: {
      startDate: "2023-06-01T09:00:00Z",
      endDate: "2023-06-01T09:00:00Z",
      frequency: "one-time"
    },
    performance: {
      sent: 24897,
      delivered: 24356,
      opened: 12450,
      clicked: 6234,
      converted: 1245
    }
  },
  {
    id: "camp-002",
    name: "Loyalty Program Members - New Rewards",
    type: "push",
    status: "active",
    audience: {
      segmentId: "seg-003",
      segmentName: "Loyalty Program Members",
      estimatedReach: 15000
    },
    content: {
      title: "New Rewards Added!",
      body: "Check out the exciting new rewards we've added to our loyalty program!",
      imageUrl: "/images/campaigns/new-rewards.jpg",
      ctaText: "View Rewards",
      ctaUrl: "/rewards"
    },
    schedule: {
      startDate: "2023-09-01T10:00:00Z",
      endDate: "2023-09-15T23:59:59Z",
      frequency: "one-time"
    },
    performance: {
      sent: 14998,
      delivered: 14785,
      opened: 8940,
      clicked: 3567,
      converted: 890
    }
  },
  {
    id: "camp-003",
    name: "Weekly Newsletter",
    type: "email",
    status: "scheduled",
    audience: {
      segmentId: "seg-002",
      segmentName: "Newsletter Subscribers",
      estimatedReach: 20000
    },
    content: {
      subject: "Your Weekly Update: Top Products & News",
      body: "Here's your weekly roundup of our top products, latest news, and exclusive offers.",
      imageUrl: "/images/campaigns/newsletter.jpg",
      ctaText: "Read More",
      ctaUrl: "/newsletter"
    },
    schedule: {
      startDate: "2023-09-10T08:00:00Z",
      frequency: "weekly"
    }
  },
  {
    id: "camp-004",
    name: "Inactive Users Re-engagement",
    type: "sms",
    status: "draft",
    audience: {
      segmentId: "seg-004",
      segmentName: "Inactive Users",
      estimatedReach: 5000
    },
    content: {
      body: "We miss you! Come back and get 20% off your next purchase with code WELCOME20.",
      ctaUrl: "/welcome-back"
    },
    schedule: {
      startDate: "2023-10-01T12:00:00Z",
      endDate: "2023-10-01T12:00:00Z",
      frequency: "one-time"
    }
  },
  {
    id: "camp-005",
    name: "App Feature Announcement",
    type: "in-app",
    status: "paused",
    audience: {
      segmentId: "seg-005",
      segmentName: "Active App Users",
      estimatedReach: 10000
    },
    content: {
      title: "New Feature Alert!",
      body: "We've added a new wishlist feature to help you save and track your favorite items.",
      imageUrl: "/images/campaigns/new-feature.jpg",
      ctaText: "Try It Now",
      ctaUrl: "/wishlist"
    },
    schedule: {
      startDate: "2023-08-15T00:00:00Z",
      endDate: "2023-08-30T23:59:59Z",
      frequency: "one-time"
    },
    performance: {
      sent: 9876,
      delivered: 9876,
      opened: 7654,
      clicked: 3456,
      converted: 1234
    }
  }
];

const mockSegments: Segment[] = [
  {
    id: "seg-001",
    name: "All Customers",
    description: "All registered customers in our database",
    memberCount: 25000,
    criteria: [
      {
        type: "registration",
        operator: "exists",
        value: true
      }
    ],
    lastUpdated: "2023-08-30T15:45:22Z"
  },
  {
    id: "seg-002",
    name: "Newsletter Subscribers",
    description: "Customers who have opted in to receive newsletters",
    memberCount: 20000,
    criteria: [
      {
        type: "subscription",
        operator: "equals",
        value: "newsletter"
      },
      {
        type: "status",
        operator: "equals",
        value: "active"
      }
    ],
    lastUpdated: "2023-09-01T09:20:45Z"
  },
  {
    id: "seg-003",
    name: "Loyalty Program Members",
    description: "Customers enrolled in our loyalty program",
    memberCount: 15000,
    criteria: [
      {
        type: "loyaltyMember",
        operator: "equals",
        value: true
      }
    ],
    lastUpdated: "2023-09-01T11:35:10Z"
  },
  {
    id: "seg-004",
    name: "Inactive Users",
    description: "Users who haven't made a purchase in 90 days",
    memberCount: 5000,
    criteria: [
      {
        type: "lastPurchase",
        operator: "greaterThan",
        value: 90
      }
    ],
    lastUpdated: "2023-09-02T08:15:30Z"
  },
  {
    id: "seg-005",
    name: "Active App Users",
    description: "Users who have used the app in the last 7 days",
    memberCount: 10000,
    criteria: [
      {
        type: "lastAppVisit",
        operator: "lessThan",
        value: 7
      }
    ],
    lastUpdated: "2023-09-03T10:40:15Z"
  }
];

export async function GET() {
  return NextResponse.json({
    campaigns: mockCampaigns,
    segments: mockSegments
  });
} 