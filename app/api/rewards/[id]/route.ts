import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET a specific reward
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reward = await prisma.reward.findUnique({
      where: { id: params.id },
    });

    if (!reward) {
      return NextResponse.json(
        { error: "Reward not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reward);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reward" },
      { status: 500 }
    );
  }
}

// PUT - update a reward
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, pointsRequired } = body;

    // Check if reward exists
    const existingReward = await prisma.reward.findUnique({
      where: { id: params.id },
    });

    if (!existingReward) {
      return NextResponse.json(
        { error: "Reward not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (title) updateData.title = title;
    if (typeof pointsRequired === 'number') updateData.pointsRequired = pointsRequired;

    // Update reward
    const updatedReward = await prisma.reward.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedReward);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update reward" },
      { status: 500 }
    );
  }
}

// DELETE - delete a reward
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if reward exists
    const existingReward = await prisma.reward.findUnique({
      where: { id: params.id },
    });

    if (!existingReward) {
      return NextResponse.json(
        { error: "Reward not found" },
        { status: 404 }
      );
    }

    // Delete reward
    await prisma.reward.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Reward deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete reward" },
      { status: 500 }
    );
  }
} 