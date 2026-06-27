import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const permissions = [
      // Users
      {
        name: "users.create",
        description: "Create users",
      },
      {
        name: "users.read",
        description: "View users",
      },
      {
        name: "users.update",
        description: "Update users",
      },
      {
        name: "users.delete",
        description: "Delete users",
      },

      // Roles
      {
        name: "roles.read",
        description: "View roles",
      },
      {
        name: "roles.update",
        description: "Manage roles",
      },

      // Companies
      {
        name: "companies.manage",
        description: "Manage company information",
      },

      // Dashboard
      {
        name: "dashboard.view",
        description: "View dashboard",
      },
    ];

    for (const permission of permissions) {
      await prisma.permission.upsert({
        where: {
          name: permission.name,
        },
        update: {
          description: permission.description,
        },
        create: permission,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Permissions seeded successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed permissions.",
      },
      {
        status: 500,
      }
    );
  }
}