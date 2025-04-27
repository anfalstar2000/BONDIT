import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET all referrals (can be filtered by user ID)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    // Get the current session to check if the user is authorized
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const where = userId ? { userId } : {};
    
    const referrals = await prisma.referral.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    
    return NextResponse.json(referrals);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}

// POST - create a new referral
export async function POST(request: NextRequest) {
  try {
    // Get the current session to check if the user is authorized
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { referredEmail } = body;
    
    // Validate input
    if (!referredEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create referral
    const referral = await prisma.referral.create({
      data: {
        userId: session.user.id,
        referredEmail,
        status: "PENDING",
      },
    });
    
    return NextResponse.json(referral, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create referral" },
      { status: 500 }
    );
  }
} 