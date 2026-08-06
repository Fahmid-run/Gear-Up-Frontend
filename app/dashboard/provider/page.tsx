"use client";

import { GearManagement } from "@/components/dashboard/gear-management";
import { OverviewSection } from "@/components/dashboard/overview-section";
import { useState } from "react";

interface Gear {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "available" | "rented" | "maintenance";
  rentals: number;
  rating: number;
  createdAt: string;
}

export default function ProviderDashboard() {
  // Sample data - replace with real API calls
  const [gears, setGears] = useState<Gear[]>([
    {
      id: "1",
      name: "Mountain Bike Pro",
      category: "Bikes",
      price: 50,
      status: "available",
      rentals: 24,
      rating: 4.8,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Camping Tent 4P",
      category: "Camping",
      price: 30,
      status: "rented",
      rentals: 18,
      rating: 4.6,
      createdAt: "2024-01-20",
    },
    {
      id: "3",
      name: "Kayak Single",
      category: "Water Sports",
      price: 45,
      status: "available",
      rentals: 32,
      rating: 4.9,
      createdAt: "2024-02-01",
    },
    {
      id: "4",
      name: "Rock Climbing Rope",
      category: "Climbing",
      price: 25,
      status: "maintenance",
      rentals: 15,
      rating: 4.7,
      createdAt: "2024-02-10",
    },
    {
      id: "5",
      name: "Hiking Backpack 60L",
      category: "Backpacks",
      price: 35,
      status: "available",
      rentals: 28,
      rating: 4.5,
      createdAt: "2024-02-15",
    },
  ]);

  const stats = {
    totalGears: gears.length,
    totalPayments: 2450,
    totalRentals: gears.reduce((sum, g) => sum + g.rentals, 0),
    totalReviews: 4.7,
  };

  const handleDelete = (id: string) => {
    setGears((prev) => prev.filter((gear) => gear.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log("Edit gear:", id);
    // Implement edit logic here
  };

  const handleUpdate = (id: string, updates: Partial<Gear>) => {
    setGears((prev) =>
      prev.map((gear) => (gear.id === id ? { ...gear, ...updates } : gear)),
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
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
        <OverviewSection stats={stats} />

        {/* Gear Management Section */}
        <GearManagement
          gears={gears}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onUpdate={handleUpdate}
        />
      </div>
    </main>
  );
}
