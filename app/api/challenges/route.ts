import { NextResponse } from "next/server";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly" | "one-time";
  pointsReward: number;
  status: "active" | "completed" | "upcoming";
  startDate: string;
  endDate: string;
  requirements: {
    type: "purchase" | "social" | "referral" | "visit" | "review";
    target: number;
    current?: number;
  };
  badgeReward?: string;
}

const mockChallenges: Challenge[] = [
  {
    id: "ch-001",
    title: "First Week Shopping Spree",
    description: "Make 3 purchases within your first week",
    type: "one-time",
    pointsReward: 500,
    status: "active",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2023-09-07T23:59:59Z",
    requirements: {
      type: "purchase",
      target: 3,
      current: 1
    }
  },
  {
    id: "ch-002",
    title: "Social Media Maven",
    description: "Share our products on social media 5 times",
    type: "weekly",
    pointsReward: 200,
    status: "active",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2023-09-07T23:59:59Z",
    requirements: {
      type: "social",
      target: 5,
      current: 2
    }
  },
  {
    id: "ch-003",
    title: "Review Guru",
    description: "Write 3 product reviews this month",
    type: "monthly",
    pointsReward: 300,
    status: "active",
    startDate: "2023-09-01T00:00:00Z", 
    endDate: "2023-09-30T23:59:59Z",
    requirements: {
      type: "review",
      target: 3,
      current: 0
    },
    badgeReward: "Product Reviewer"
  },
  {
    id: "ch-004",
    title: "Daily Login Streak",
    description: "Log in to the app for 7 consecutive days",
    type: "daily",
    pointsReward: 150,
    status: "active",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2023-09-07T23:59:59Z",
    requirements: {
      type: "visit",
      target: 7,
      current: 3
    }
  },
  {
    id: "ch-005",
    title: "Referral Champion",
    description: "Refer 5 friends who complete their first purchase",
    type: "one-time",
    pointsReward: 1000,
    status: "upcoming",
    startDate: "2023-10-01T00:00:00Z",
    endDate: "2023-10-31T23:59:59Z",
    requirements: {
      type: "referral",
      target: 5
    },
    badgeReward: "Referral Champion"
  }
];

export async function GET() {
  return NextResponse.json(mockChallenges);
} 