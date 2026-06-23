import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";



// GET /api/register
export async function GET() {
  return NextResponse.json({
    message: "Register API is running",
  });
}

/**
 * POST /api/register
 *
 * Creates a new user
 */
export async function POST(request: NextRequest) {
  try {
    // Read request body
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    // Find Admin role
    const role = await prisma.role.findFirst({
      where: {
        name: "Admin",
      },
    });

    // Make sure the role exists
    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin role not found",
        },
        { status: 404 }
      );
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: role.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        createdAt: true,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}