import { NextResponse } from "next/server";

export interface PointsReward {
  id: string;
  name: string;
  pointsRequired: number;
  description: string;
  type: "product" | "discount" | "experience";
  isActive: boolean;
  thumbnail?: string;
}

const mockPointsRewards: PointsReward[] = [
  {
    id: "pr-001",
    name: "5% Discount",
    pointsRequired: 500,
    description: "Get 5% off on your next purchase",
    type: "discount",
    isActive: true,
  },
  {
    id: "pr-002",
    name: "Free Product Sample",
    pointsRequired: 1000,
    description: "Redeem a free product sample",
    type: "product",
    isActive: true,
    thumbnail: "/images/sample-product.jpg",
  },
  {
    id: "pr-003",
    name: "VIP Event Access",
    pointsRequired: 2500,
    description: "Get exclusive access to our next launch event",
    type: "experience",
    isActive: true,
  },
  {
    id: "pr-004",
    name: "Premium Membership (1 month)",
    pointsRequired: 5000,
    description: "Upgrade to premium membership for one month",
    type: "experience",
    isActive: true,
  },
  {
    id: "pr-005",
    name: "Limited Edition Product",
    pointsRequired: 7500,
    description: "Redeem points for our limited edition product",
    type: "product",
    isActive: false,
    thumbnail: "/images/limited-edition.jpg",
  },
];

export async function GET() {
  return NextResponse.json(mockPointsRewards);
} 