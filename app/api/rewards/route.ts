import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET all rewards
export async function GET() {
  try {
    const rewards = await prisma.reward.findMany();
    return NextResponse.json(rewards);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rewards" },
      { status: 500 }
    );
  }
}

// POST - create a new reward
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, pointsRequired } = body;
    
    // Validate input
    if (!title || typeof pointsRequired !== 'number') {
      return NextResponse.json(
        { error: "Missing required fields or invalid data" },
        { status: 400 }
      );
    }
    
    // Create reward
    const reward = await prisma.reward.create({
      data: {
        title,
        pointsRequired,
      },
    });
    
    return NextResponse.json(reward, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create reward" },
      { status: 500 }
    );
  }
} 