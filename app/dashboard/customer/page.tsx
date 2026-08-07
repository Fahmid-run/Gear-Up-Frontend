import { CustomerOverviewSection } from "@/components/dashboard/customer-overview";
import { getCustomerStates } from "@/service/customerService";

export default async function CustomerDashboard() {
  const stats = await getCustomerStates();
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">Overview</h1>
          <p className="text-lg text-slate-600">
            Track your gear rentals, payments, and reviews
          </p>
        </div>

        {/* Overview Section */}
        <CustomerOverviewSection stats={stats.data} />

        {/* Rentals List Section */}
        {/* <RentalsList rentals={rentals} /> */}
      </div>
    </main>
  );
}
