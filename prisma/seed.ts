import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PERMISSIONS } from "../src/constants/permissions";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // ----------------------------
  // Company
  // ----------------------------
  const company = await prisma.company.upsert({
    where: {
      email: "info@financialsystem.com",
    },
    update: {},
    create: {
      name: "Financial System Demo",
      email: "info@financialsystem.com",
      phone: "+256700000000",
      address: "Kampala, Uganda",
    },
  });

  console.log("✅ Company created.");

  // ----------------------------
  // Roles
  // ----------------------------
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "System Administrator",
    },
  });

  const managerRole = await prisma.role.upsert({
    where: { name: "Manager" },
    update: {},
    create: {
      name: "Manager",
      description: "Company Manager",
    },
  });

  const accountantRole = await prisma.role.upsert({
    where: { name: "Accountant" },
    update: {},
    create: {
      name: "Accountant",
      description: "Accountant",
    },
  });

  const cashierRole = await prisma.role.upsert({
    where: { name: "Cashier" },
    update: {},
    create: {
      name: "Cashier",
      description: "Cashier",
    },
  });

  const auditorRole = await prisma.role.upsert({
    where: { name: "Auditor" },
    update: {},
    create: {
      name: "Auditor",
      description: "Auditor",
    },
  });

  console.log("✅ Roles created.");

  // ----------------------------
// Permissions
// ----------------------------

// Flatten the permission object into an array.
const permissionNames = Object.values(PERMISSIONS)
  .flatMap((group) => Object.values(group));

for (const permissionName of permissionNames) {
  await prisma.permission.upsert({
    where: {
      name: permissionName,
    },
    update: {},
    create: {
      name: permissionName,
    },
  });
}

console.log("✅ Permissions created.");

// ----------------------------
// Assign Permissions to Roles
// ----------------------------

// Give the Admin role every permission
await prisma.role.update({
  where: {
    id: adminRole.id,
  },
  data: {
    permissions: {
      set: [], // Clear existing assignments (safe for reseeding)
      connect: await prisma.permission.findMany({
        select: {
          id: true,
        },
      }),
    },
  },
});

console.log("✅ Admin permissions assigned.");

  // ----------------------------
  // Admin User
  // ----------------------------
  const hashedPassword = await bcrypt.hash("Admin@123", 12);

  await prisma.user.upsert({
    where: {
      email: "admin@financialsystem.com",
    },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@financialsystem.com",
      password: hashedPassword,
      companyId: company.id,
      roleId: adminRole.id,
    },
  });

  console.log("✅ Administrator created.");

  console.log("🎉 Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });