"use client";

interface StatusBadgeProps {
  status: "available" | "rented" | "maintenance";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    available: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Available",
    },
    rented: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      label: "Rented",
    },
    maintenance: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Maintenance",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
