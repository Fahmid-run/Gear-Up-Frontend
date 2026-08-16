"use client";

import { Package } from "lucide-react";
import { deleteGear } from "@/service/providerService";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Edit2, CheckCircle } from "lucide-react";
import { DataTable } from "./data-table";
import { StatusBadge } from "./status-badge";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import Link from "next/link";

interface Gear {
  id: string;
  name: string;
  rentalPricePerDay: number;
  availability: "AVAILABLE" | "UNAVAILABLE" | "RENTED";
  createdAt: string;
}

interface GearManagementProps {
  gears: Gear[];
}

export function GearManagement({ gears }: GearManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const itemsPerPage = 5;

  const router = useRouter();

  const filteredGears = useMemo(() => {
    if (!searchQuery.trim()) return gears;

    const query = searchQuery.toLowerCase();
    return gears.filter(
      (gear) =>
        gear.name.toLowerCase().includes(query) ||
        gear.availability.toLowerCase().includes(query),
    );
  }, [gears, searchQuery]);

  const totalPages = Math.ceil(filteredGears.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGears = filteredGears.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteGear(id);

      if (res.success) {
        toast.add({
          type: "success",
          description: "Gear Deleted",
        });

        router.refresh();
      }

      if (!res.success) {
        toast.add({
          type: "error",
          description: res.message,
        });

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tableColumns = [
    {
      key: "name",
      label: "Gear Name",
      render: (gear: Gear) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-200" />
          <div>
            <p className="font-medium text-slate-900">{gear.name}</p>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      label: "Daily Rate",
      render: (gear: Gear) => (
        <span className="font-semibold">${gear.rentalPricePerDay}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (gear: Gear) => <StatusBadge status={gear.availability} />,
    },

    {
      key: "actions",
      label: "Actions",
      render: (gear: Gear) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/provider/gear/${gear.id}/edit`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:bg-blue-50"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(gear.id)}
            disabled={deletingId === gear.id}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-2xl">Gear Management</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search gears, categories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <DataTable columns={tableColumns} data={paginatedGears} />

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredGears.length)} of{" "}
              {filteredGears.length} results
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {paginatedGears.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg text-slate-600">No gears found</p>
            <p className="text-sm text-slate-500">
              {searchQuery
                ? "Try adjusting your search criteria"
                : "Start by adding your first gear item"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
