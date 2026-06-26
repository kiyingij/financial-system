import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const roles = [
      "Admin",
      "Manager",
      "Accountant",
      "Cashier",
      "Auditor",
    ];

    const createdRoles = [];

    for (const roleName of roles) {
      const role = await prisma.role.upsert({
        where: {
          name: roleName,
        },
        update: {},
        create: {
          name: roleName,
        },
      });

      createdRoles.push(role);
    }

    return NextResponse.json({
      success: true,
      message: "Default roles seeded successfully.",
      roles: createdRoles,
    });
  } catch (error) {
    console.error("Seed Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}