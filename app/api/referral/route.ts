import { NextResponse } from "next/server";

export interface Referral {
  id: string;
  referrerCode: string;
  referrerReward: {
    type: "points" | "discount" | "product";
    value: number | string;
    description: string;
  };
  refereeReward: {
    type: "points" | "discount" | "product";
    value: number | string;
    description: string;
  };
  status: "active" | "inactive";
  expiry?: string;
}

export interface ReferralHistory {
  id: string;
  referrerUserId: string;
  refereeEmail: string;
  status: "pending" | "completed" | "expired";
  dateReferred: string;
  dateCompleted?: string;
  rewardClaimed: boolean;
}

const mockReferralProgram: Referral = {
  id: "ref-prog-001",
  referrerCode: "FRIEND2023",
  referrerReward: {
    type: "points",
    value: 500,
    description: "Earn 500 points for each successful referral"
  },
  refereeReward: {
    type: "discount",
    value: "15%",
    description: "Your friend gets 15% off their first purchase"
  },
  status: "active",
  expiry: "2023-12-31T23:59:59Z"
};

const mockReferralHistory: ReferralHistory[] = [
  {
    id: "ref-hist-001",
    referrerUserId: "user-123",
    refereeEmail: "john.doe@example.com",
    status: "completed",
    dateReferred: "2023-08-15T10:30:00Z",
    dateCompleted: "2023-08-17T14:22:33Z",
    rewardClaimed: true
  },
  {
    id: "ref-hist-002",
    referrerUserId: "user-123",
    refereeEmail: "jane.smith@example.com",
    status: "pending",
    dateReferred: "2023-08-20T08:45:12Z",
    rewardClaimed: false
  },
  {
    id: "ref-hist-003",
    referrerUserId: "user-123",
    refereeEmail: "robert.johnson@example.com",
    status: "expired",
    dateReferred: "2023-07-05T16:20:45Z",
    rewardClaimed: false
  },
  {
    id: "ref-hist-004",
    referrerUserId: "user-123",
    refereeEmail: "sarah.williams@example.com",
    status: "completed",
    dateReferred: "2023-08-25T09:15:30Z",
    dateCompleted: "2023-08-26T11:10:22Z",
    rewardClaimed: false
  },
  {
    id: "ref-hist-005",
    referrerUserId: "user-123",
    refereeEmail: "michael.brown@example.com",
    status: "pending",
    dateReferred: "2023-09-01T14:05:18Z",
    rewardClaimed: false
  }
];

export async function GET() {
  return NextResponse.json({
    program: mockReferralProgram,
    history: mockReferralHistory
  });
} 