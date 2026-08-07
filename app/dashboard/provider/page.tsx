import { GearManagement } from "@/components/dashboard/gear-management";
import { OverviewSection } from "@/components/dashboard/overview-section";
import { getMyGear } from "@/service/gearItem";
import { providerOverviewStats } from "@/service/providerService";

export default async function ProviderDashboard() {
  const stats = await providerOverviewStats();

  const gears = await getMyGear();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            Provider Dashboard
          </h1>
          <p className="text-lg text-slate-600">
            Manage your gear inventory and earnings
          </p>
        </div>

        {/* Overview Section */}
        <OverviewSection stats={stats.data} />

        {/* Gear Management Section */}
        <GearManagement
          gears={gears.data}
          // onDelete={handleDelete}
          // onEdit={handleEdit}
          // onUpdate={handleUpdate}
        />
      </div>
    </main>
  );
}
