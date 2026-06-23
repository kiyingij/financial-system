import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check whether Admin role already exists
    const existingRole = await prisma.role.findFirst({
      where: {
        name: "Admin",
      },
    });

    if (existingRole) {
      return NextResponse.json({
        message: "Admin role already exists",
        role: existingRole,
      });
    }

    // Create Admin role
    const role = await prisma.role.create({
      data: {
        name: "Admin",
      },
    });

    return NextResponse.json({
      message: "Admin role created successfully",
      role,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}