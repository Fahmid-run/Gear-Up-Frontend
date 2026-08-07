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
const mockCustomers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    address: "123 Main St, New York, NY 10001",
    status: "ACTIVE",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Provider",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    status: "SUSPENDED",
    joinedDate: "2024-01-20",
  },
];

const mockDashboardMetrics: DashboardMetricss = {
  totalCustomers: 128,
  activeGear: 45,
  totalRentals: 892,
};

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
