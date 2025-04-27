import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET a specific badge
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const badge = await prisma.badge.findUnique({
      where: { id: params.id },
    });

    if (!badge) {
      return NextResponse.json(
        { error: "Badge not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(badge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch badge" },
      { status: 500 }
    );
  }
}

// PUT - update a badge
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, level } = body;

    // Check if badge exists
    const existingBadge = await prisma.badge.findUnique({
      where: { id: params.id },
    });

    if (!existingBadge) {
      return NextResponse.json(
        { error: "Badge not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (title) updateData.title = title;
    if (typeof level === 'number') updateData.level = level;

    // Update badge
    const updatedBadge = await prisma.badge.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedBadge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update badge" },
      { status: 500 }
    );
  }
}

// DELETE - delete a badge
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if badge exists
    const existingBadge = await prisma.badge.findUnique({
      where: { id: params.id },
    });

    if (!existingBadge) {
      return NextResponse.json(
        { error: "Badge not found" },
        { status: 404 }
      );
    }

    // Delete badge
    await prisma.badge.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Badge deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete badge" },
      { status: 500 }
    );
  }
} 