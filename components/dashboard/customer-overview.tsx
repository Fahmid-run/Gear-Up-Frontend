"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, RotateCw, Star, Zap } from "lucide-react";

interface Stats {
  totalPayments: number;
  totalRentals: number;
  confirmedRentals: number;
}

interface CustomerOverviewSectionProps {
  stats: Stats;
}

export function CustomerOverviewSection({
  stats,
}: CustomerOverviewSectionProps) {
  const statCards = [
    {
      title: "Total Spent",
      value: `$${stats.totalPayments ? stats.totalPayments.toLocaleString() : 0}`,
      icon: CreditCard,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Total Rentals",
      value: stats.totalRentals,
      icon: RotateCw,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Active Rentals",
      value: stats.confirmedRentals,
      icon: Zap,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className={`border-2 ${stat.borderColor} ${stat.bgColor} transition-all hover:shadow-lg`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
