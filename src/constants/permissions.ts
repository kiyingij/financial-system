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
    READ: "roles.read",
    UPDATE: "roles.update",
  },

  COMPANIES: {
    MANAGE: "companies.manage",
  },
} as const;