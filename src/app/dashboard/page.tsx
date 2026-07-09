import { redirect } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import { getSession } from "@/lib/session";
import { hasPermission } from "@/lib/rbac";
import { PERMISSIONS } from "@/constants/permissions";

export default async function DashboardPage() {

  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (
    !hasPermission(
      session.user.role,
      PERMISSIONS.DASHBOARD.VIEW
    )
  ) {
    redirect("/access-denied");
  }

  return (
    <AppLayout>

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

    </AppLayout>
  );
}