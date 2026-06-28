/**
 * System Roles
 * These are the default roles used throughout the application.
 */
export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  ACCOUNTANT: "Accountant",
  CASHIER: "Cashier",
  AUDITOR: "Auditor",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];