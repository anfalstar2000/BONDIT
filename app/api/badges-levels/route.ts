import { NextResponse } from "next/server";

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  isActive: boolean;
}

export interface Level {
  id: number;
  name: string;
  pointsRequired: number;
  benefits: string[];
  icon: string;
}

const mockBadges: Badge[] = [
  {
    id: "b-001",
    name: "First Purchase",
    description: "Awarded after completing your first purchase",
    imageUrl: "/images/badges/first-purchase.svg",
    criteria: "Complete first purchase",
    rarity: "common",
    isActive: true,
  },
  {
    id: "b-002",
    name: "Early Adopter",
    description: "One of our first 1000 customers",
    imageUrl: "/images/badges/early-adopter.svg",
    criteria: "Be among first 1000 users",
    rarity: "rare",
    isActive: true,
  },
  {
    id: "b-003",
    name: "Social Butterfly",
    description: "Share 5 products on social media",
    imageUrl: "/images/badges/social-butterfly.svg",
    criteria: "Share 5 products on social platforms",
    rarity: "common",
    isActive: true,
  },
  {
    id: "b-004",
    name: "Loyal Customer",
    description: "Place orders for 3 consecutive months",
    imageUrl: "/images/badges/loyal-customer.svg",
    criteria: "Order in 3 consecutive months",
    rarity: "epic",
    isActive: true,
  },
  {
    id: "b-005",
    name: "Product Expert",
    description: "Write 10 detailed product reviews",
    imageUrl: "/images/badges/product-expert.svg",
    criteria: "Write 10 reviews with min 100 characters",
    rarity: "legendary",
    isActive: true,
  }
];

const mockLevels: Level[] = [
  {
    id: 1,
    name: "Bronze",
    pointsRequired: 0,
    benefits: ["Access to basic rewards", "Birthday gift"],
    icon: "/images/levels/bronze.svg"
  },
  {
    id: 2,
    name: "Silver",
    pointsRequired: 1000,
    benefits: ["5% bonus points", "Exclusive promotions", "Priority support"],
    icon: "/images/levels/silver.svg"
  },
  {
    id: 3,
    name: "Gold",
    pointsRequired: 5000,
    benefits: ["10% bonus points", "Free shipping", "Early access to sales"],
    icon: "/images/levels/gold.svg"
  },
  {
    id: 4,
    name: "Platinum",
    pointsRequired: 10000,
    benefits: ["15% bonus points", "Personal shopper", "VIP events", "Gift wrapping"],
    icon: "/images/levels/platinum.svg"
  },
  {
    id: 5,
    name: "Diamond",
    pointsRequired: 25000,
    benefits: ["20% bonus points", "Concierge service", "Exclusive products", "Free returns"],
    icon: "/images/levels/diamond.svg"
  }
];

export async function GET() {
  return NextResponse.json({
    badges: mockBadges,
    levels: mockLevels
  });
} 