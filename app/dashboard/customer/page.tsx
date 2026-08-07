"use client";

import { CustomerOverviewSection } from "@/components/dashboard/customer-overview";
import { RentalsList } from "@/components/dashboard/rental-list";
import { useState } from "react";

interface Rental {
  id: string;
  gearName: string;
  category: string;
  provider: string;
  startDate: string;
  endDate: string;
  dailyRate: number;
  totalCost: number;
  status: "active" | "completed" | "cancelled";
  rating: number | null;
}

export default function CustomerDashboard() {
  // Sample data - replace with real API calls
  const [rentals, setRentals] = useState<Rental[]>([
    {
      id: "1",
      gearName: "Mountain Bike Pro",
      category: "Bikes",
      provider: "Adventure Gear Co",
      startDate: "2024-03-10",
      endDate: "2024-03-15",
      dailyRate: 50,
      totalCost: 250,
      status: "completed",
      rating: 4.8,
    },
    {
      id: "2",
      gearName: "Camping Tent 4P",
      category: "Camping",
      provider: "Outdoor Rentals",
      startDate: "2024-03-20",
      endDate: "2024-03-27",
      dailyRate: 30,
      totalCost: 210,
      status: "active",
      rating: null,
    },
    {
      id: "3",
      gearName: "Kayak Single",
      category: "Water Sports",
      provider: "Water Sports Hub",
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      dailyRate: 45,
      totalCost: 90,
      status: "completed",
      rating: 4.9,
    },
    {
      id: "4",
      gearName: "Hiking Backpack 60L",
      category: "Backpacks",
      provider: "Trek Essentials",
      startDate: "2024-03-01",
      endDate: "2024-03-08",
      dailyRate: 35,
      totalCost: 245,
      status: "completed",
      rating: 4.5,
    },
    {
      id: "5",
      gearName: "Rock Climbing Rope",
      category: "Climbing",
      provider: "Climb Safe",
      startDate: "2024-03-25",
      endDate: "2024-04-01",
      dailyRate: 25,
      totalCost: 200,
      status: "active",
      rating: null,
    },
  ]);

  const stats = {
    totalPayments: rentals.reduce((sum, r) => sum + r.totalCost, 0),
    totalRentals: rentals.length,
    activeRentals: rentals.filter((r) => r.status === "active").length,
    averageRating:
      rentals
        .filter((r) => r.rating !== null)
        .reduce((sum, r) => sum + (r.rating || 0), 0) /
      rentals.filter((r) => r.rating !== null).length,
  };

  const handleCancelRental = (id: string) => {
    setRentals((prev) =>
      prev.map((rental) =>
        rental.id === id ? { ...rental, status: "cancelled" as const } : rental,
      ),
    );
  };

  const handleRateRental = (id: string, rating: number) => {
    setRentals((prev) =>
      prev.map((rental) => (rental.id === id ? { ...rental, rating } : rental)),
    );
  };

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
        <CustomerOverviewSection stats={stats} />

        {/* Rentals List Section */}
        <RentalsList
          rentals={rentals}
          onCancelRental={handleCancelRental}
          onRateRental={handleRateRental}
        />
      </div>
    </main>
  );
}
