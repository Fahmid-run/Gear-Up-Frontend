"use client";

import { DashboardMetrics } from "@/components/blocks/admin-dashboard-metrics";
import { UserManagement } from "@/components/blocks/user-management";

interface DashboardMetricss {
  totalCustomers: number;
  activeGear: number;
  totalRentals: number;
}

type UserRole = "Admin" | "Provider" | "Customer";
interface Customer {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  address: string;
  status: "active" | "suspended";
  joinedDate: string;
}
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    address: "123 Main St, New York, NY 10001",
    status: "active",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Provider",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    status: "active",
    joinedDate: "2024-01-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Customer",
    address: "789 Pine Rd, Chicago, IL 60601",
    status: "suspended",
    joinedDate: "2024-02-01",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Customer",
    address: "321 Elm St, Houston, TX 77001",
    status: "active",
    joinedDate: "2024-02-10",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Customer",
    address: "654 Maple Dr, Phoenix, AZ 85001",
    status: "active",
    joinedDate: "2024-02-15",
  },
  {
    id: "6",
    name: "Diana Martinez",
    email: "diana@example.com",
    role: "Provider",
    address: "987 Cedar Ln, Philadelphia, PA 19101",
    status: "active",
    joinedDate: "2024-02-20",
  },
  {
    id: "7",
    name: "Edward Garcia",
    email: "edward@example.com",
    role: "Customer",
    address: "147 Birch St, San Antonio, TX 78201",
    status: "suspended",
    joinedDate: "2024-03-01",
  },
  {
    id: "8",
    name: "Fiona Lee",
    email: "fiona@example.com",
    role: "Customer",
    address: "258 Spruce Ave, San Diego, CA 92101",
    status: "active",
    joinedDate: "2024-03-05",
  },
];

const mockDashboardMetrics: DashboardMetricss = {
  totalCustomers: 128,
  activeGear: 45,
  totalRentals: 892,
};

export default function AdminPanel() {
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
      <DashboardMetrics metrics={mockDashboardMetrics} />

      {/* Customer Management */}
      <UserManagement users={mockCustomers} />
    </div>
  );
}
