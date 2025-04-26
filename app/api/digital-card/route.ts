import { NextResponse } from "next/server";

export interface DigitalCard {
  id: string;
  userId: string;
  cardNumber: string;
  cardType: "standard" | "gold" | "platinum" | "black";
  memberSince: string;
  expiryDate: string;
  status: "active" | "inactive" | "expired";
  benefits: string[];
  qrCode: string;
  barcode: string;
  cardDesign: {
    backgroundImage: string;
    textColor: string;
    accentColor: string;
  };
  lastUsed?: string;
}

const mockDigitalCards: DigitalCard[] = [
  {
    id: "dc-001",
    userId: "user-123",
    cardNumber: "7890-1234-5678-9012",
    cardType: "standard",
    memberSince: "2023-01-15",
    expiryDate: "2024-01-15",
    status: "active",
    benefits: ["5% discount on all purchases", "Free shipping on orders over $50"],
    qrCode: "/images/cards/qr-codes/standard-qr.png",
    barcode: "7890123456789012",
    cardDesign: {
      backgroundImage: "/images/cards/backgrounds/standard.jpg",
      textColor: "#000000",
      accentColor: "#4287f5"
    },
    lastUsed: "2023-09-01T14:32:45Z"
  },
  {
    id: "dc-002",
    userId: "user-456",
    cardNumber: "4567-8901-2345-6789",
    cardType: "gold",
    memberSince: "2022-06-20",
    expiryDate: "2024-06-20",
    status: "active",
    benefits: ["10% discount on all purchases", "Free shipping on all orders", "Priority customer service"],
    qrCode: "/images/cards/qr-codes/gold-qr.png",
    barcode: "4567890123456789",
    cardDesign: {
      backgroundImage: "/images/cards/backgrounds/gold.jpg",
      textColor: "#ffffff",
      accentColor: "#f5d742"
    },
    lastUsed: "2023-08-28T09:15:10Z"
  },
  {
    id: "dc-003",
    userId: "user-789",
    cardNumber: "1234-5678-9012-3456",
    cardType: "platinum",
    memberSince: "2021-11-05",
    expiryDate: "2023-11-05",
    status: "active",
    benefits: ["15% discount on all purchases", "Free shipping and returns", "Exclusive access to events", "Personal shopper"],
    qrCode: "/images/cards/qr-codes/platinum-qr.png",
    barcode: "1234567890123456",
    cardDesign: {
      backgroundImage: "/images/cards/backgrounds/platinum.jpg",
      textColor: "#ffffff",
      accentColor: "#b8b8b8"
    },
    lastUsed: "2023-09-02T16:45:22Z"
  },
  {
    id: "dc-004",
    userId: "user-012",
    cardNumber: "9012-3456-7890-1234",
    cardType: "black",
    memberSince: "2020-03-10",
    expiryDate: "2025-03-10",
    status: "active",
    benefits: ["20% discount on all purchases", "Free premium shipping worldwide", "24/7 concierge service", "Exclusive products", "VIP events"],
    qrCode: "/images/cards/qr-codes/black-qr.png",
    barcode: "9012345678901234",
    cardDesign: {
      backgroundImage: "/images/cards/backgrounds/black.jpg",
      textColor: "#ffffff",
      accentColor: "#000000"
    },
    lastUsed: "2023-09-03T11:20:30Z"
  },
  {
    id: "dc-005",
    userId: "user-345",
    cardNumber: "5678-9012-3456-7890",
    cardType: "standard",
    memberSince: "2022-09-25",
    expiryDate: "2023-09-25",
    status: "expired",
    benefits: ["5% discount on all purchases", "Free shipping on orders over $50"],
    qrCode: "/images/cards/qr-codes/standard-qr.png",
    barcode: "5678901234567890",
    cardDesign: {
      backgroundImage: "/images/cards/backgrounds/standard.jpg",
      textColor: "#000000",
      accentColor: "#4287f5"
    },
    lastUsed: "2023-08-20T15:10:45Z"
  }
];

export async function GET() {
  return NextResponse.json(mockDigitalCards);
} 