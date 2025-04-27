import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET a specific referral
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the current session to check if the user is authorized
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const referral = await prisma.referral.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!referral) {
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }

    // Only allow users to view their own referrals
    if (referral.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    return NextResponse.json(referral);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch referral" },
      { status: 500 }
    );
  }
}

// PUT - update a referral
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { status } = body;

    // Check if referral exists
    const existingReferral = await prisma.referral.findUnique({
      where: { id: params.id },
    });

    if (!existingReferral) {
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }

    // Only allow users to update their own referrals
    if (existingReferral.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Validate status
    if (status && !["PENDING", "COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Update referral
    const updatedReferral = await prisma.referral.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updatedReferral);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update referral" },
      { status: 500 }
    );
  }
}

// DELETE - delete a referral
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the current session to check if the user is authorized
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Check if referral exists
    const existingReferral = await prisma.referral.findUnique({
      where: { id: params.id },
    });

    if (!existingReferral) {
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }

    // Only allow users to delete their own referrals
    if (existingReferral.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete referral
    await prisma.referral.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Referral deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete referral" },
      { status: 500 }
    );
  }
} 