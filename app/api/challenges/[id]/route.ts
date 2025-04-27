import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET a specific challenge
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id: params.id },
    });

    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(challenge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch challenge" },
      { status: 500 }
    );
  }
}

// PUT - update a challenge
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, points } = body;

    // Check if challenge exists
    const existingChallenge = await prisma.challenge.findUnique({
      where: { id: params.id },
    });

    if (!existingChallenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (typeof points === 'number') updateData.points = points;

    // Update challenge
    const updatedChallenge = await prisma.challenge.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedChallenge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update challenge" },
      { status: 500 }
    );
  }
}

// DELETE - delete a challenge
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if challenge exists
    const existingChallenge = await prisma.challenge.findUnique({
      where: { id: params.id },
    });

    if (!existingChallenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Delete challenge
    await prisma.challenge.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Challenge deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete challenge" },
      { status: 500 }
    );
  }
} 