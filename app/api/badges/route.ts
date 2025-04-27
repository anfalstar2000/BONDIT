import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET all badges
export async function GET() {
  try {
    const badges = await prisma.badge.findMany();
    return NextResponse.json(badges);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch badges" },
      { status: 500 }
    );
  }
}

// POST - create a new badge
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, level } = body;
    
    // Validate input
    if (!title || typeof level !== 'number') {
      return NextResponse.json(
        { error: "Missing required fields or invalid data" },
        { status: 400 }
      );
    }
    
    // Create badge
    const badge = await prisma.badge.create({
      data: {
        title,
        level,
      },
    });
    
    return NextResponse.json(badge, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create badge" },
      { status: 500 }
    );
  }
} 