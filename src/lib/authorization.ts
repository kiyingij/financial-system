import { prisma } from "@/lib/prisma";

/**
 * Gets every permission assigned
 * to a specific role.
 */
export async function getRolePermissions(roleName: string) {
  const role = await prisma.role.findUnique({
    where: {
      name: roleName,
    },
    include: {
      permissions: true,
    },
  });

  if (!role) {
    return [];
  }

  return role.permissions;
}

/**
 * Checks whether a role
 * has a specific permission.
 */
export async function roleHasPermission(
  roleName: string,
  permissionName: string
) {

  const permissions = await getRolePermissions(roleName);

  return permissions.some(
    permission => permission.name === permissionName
  );

}