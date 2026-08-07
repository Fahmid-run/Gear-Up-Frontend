import { DashboardMetrics } from "@/components/blocks/admin-dashboard-metrics";
import { UserManagement } from "@/components/blocks/user-management";
import { getAllUser, getStates } from "@/service/adminService";

interface DashboardMetricss {
  totalCustomers: number;
  activeGear: number;
  totalRentals: number;
}

type UserRole = "Admin" | "Provider" | "Customer";
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  address: string;
  status: "ACTIVE" | "SUSPENDED";
  joinedDate: string;
}

export default async function AdminPanel() {
  const userData = await getAllUser();

  const getState = await getStates();

  return (
    <div className="space-y-8 px-6 py-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Global overview of platform health and Customer management
        </p>
      </div>

      {/* Metrics */}
      <DashboardMetrics metrics={getState.data} />

      {/* Customer Management */}
      <UserManagement users={userData.data} />
    </div>
  );
}
