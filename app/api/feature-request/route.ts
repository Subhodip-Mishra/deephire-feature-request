import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, featureRequest, userType } = body;

    if (!name || !email || !featureRequest) {
      return NextResponse.json(
        { error: "All fields (name, email, featureRequest) are required" },
        { status: 400 }
      );
    }

    const newRequest = await prisma.featureRequest.create({
      data: { name, email, featureRequest, userType: userType || "job-seeker" },
    });

    return NextResponse.json(
      { message: "Feature request submitted successfully", data: newRequest },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error submitting feature request:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Failed to submit feature request", details: message },
      { status: 500 }
    );
  }
}

// fetch all feature-requests
export async function GET() {
  try {
    const featureRequests = await prisma.featureRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(featureRequests, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching feature requests:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Failed to fetch feature requests", details: message },
      { status: 500 }
    );
  }
}
