/**
 * System Permissions
 * Every permission in the application is defined here.
 */

export const PERMISSIONS = {

  DASHBOARD: {
    VIEW: "dashboard.view",
  },

  USERS: {
    CREATE: "users.create",
    READ: "users.read",
    UPDATE: "users.update",
    DELETE: "users.delete",
  },

  ROLES: {
    CREATE: "roles.create",
    READ: "roles.read",
    UPDATE: "roles.update",
    DELETE: "roles.delete",
  },

  CUSTOMERS: {
    CREATE: "customers.create",
    READ: "customers.read",
    UPDATE: "customers.update",
    DELETE: "customers.delete",
  },

  SUPPLIERS: {
    CREATE: "suppliers.create",
    READ: "suppliers.read",
    UPDATE: "suppliers.update",
    DELETE: "suppliers.delete",
  },

  ACCOUNTS: {
    CREATE: "accounts.create",
    READ: "accounts.read",
    UPDATE: "accounts.update",
    DELETE: "accounts.delete",
  },

  TRANSACTIONS: {
    CREATE: "transactions.create",
    READ: "transactions.read",
    UPDATE: "transactions.update",
    DELETE: "transactions.delete",
  },

  REPORTS: {
    VIEW: "reports.view",
    EXPORT: "reports.export",
  },

  SETTINGS: {
    UPDATE: "settings.update",
  }

} as const;