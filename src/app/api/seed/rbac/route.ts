import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ROLES } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";

export async function GET() {
  try {
    // Fetch all roles
    const roles = await prisma.role.findMany();

    // Fetch all permissions
    const permissions = await prisma.permission.findMany();

    // Helper function
    const getPermissionIds = (names: string[]) =>
      permissions
        .filter((permission) => names.includes(permission.name))
        .map((permission) => ({ id: permission.id }));

    // ADMIN
    const admin = roles.find(
      (role) => role.name === ROLES.ADMIN
    );

    if (admin) {
      await prisma.role.update({
        where: {
          id: admin.id,
        },
        data: {
          permissions: {
            set: getPermissionIds(
              permissions.map((permission) => permission.name)
            ),
          },
        },
      });
    }

    // MANAGER
    const manager = roles.find(
      (role) => role.name === ROLES.MANAGER
    );

    if (manager) {
      await prisma.role.update({
        where: {
          id: manager.id,
        },
        data: {
          permissions: {
            set: getPermissionIds([
              PERMISSIONS.DASHBOARD.VIEW,
              PERMISSIONS.USERS.READ,
              PERMISSIONS.ROLES.READ,
            ]),
          },
        },
      });
    }

    // ACCOUNTANT
    const accountant = roles.find(
      (role) => role.name === ROLES.ACCOUNTANT
    );

    if (accountant) {
      await prisma.role.update({
        where: {
          id: accountant.id,
        },
        data: {
          permissions: {
            set: getPermissionIds([
              PERMISSIONS.DASHBOARD.VIEW,
            ]),
          },
        },
      });
    }

    // CASHIER
    const cashier = roles.find(
      (role) => role.name === ROLES.CASHIER
    );

    if (cashier) {
      await prisma.role.update({
        where: {
          id: cashier.id,
        },
        data: {
          permissions: {
            set: getPermissionIds([
              PERMISSIONS.DASHBOARD.VIEW,
            ]),
          },
        },
      });
    }

    // AUDITOR
    const auditor = roles.find(
      (role) => role.name === ROLES.AUDITOR
    );

    if (auditor) {
      await prisma.role.update({
        where: {
          id: auditor.id,
        },
        data: {
          permissions: {
            set: getPermissionIds([
              PERMISSIONS.DASHBOARD.VIEW,
              PERMISSIONS.ROLES.READ,
            ]),
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "RBAC assigned successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to assign permissions.",
      },
      {
        status: 500,
      }
    );
  }
}