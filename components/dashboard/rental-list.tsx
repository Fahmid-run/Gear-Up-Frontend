"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Star } from "lucide-react";
import { DataTable } from "./data-table";
import { StatusBadge } from "./status-badge";

interface RentalsListProps {
  rentals: any[];
}

export function RentalsList({ rentals }: RentalsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [ratingId, setRatingId] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const itemsPerPage = 10;

  // Filter rentals based on search query
  const filteredRentals = useMemo(() => {
    if (!searchQuery.trim()) return rentals;

    const query = searchQuery.toLowerCase();
    return rentals.filter(
      (rental) =>
        rental.gearName.toLowerCase().includes(query) ||
        rental.category.toLowerCase().includes(query) ||
        rental.provider.toLowerCase().includes(query) ||
        rental.status.toLowerCase().includes(query),
    );
  }, [rentals, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredRentals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRentals = filteredRentals.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleCancel = (id: string) => {
    setCancelingId(id);
    setTimeout(() => {
      setCancelingId(null);
    }, 500);
  };

  const handleSubmitRating = (id: string) => {
    if (selectedRating > 0) {
      setRatingId(null);
      setSelectedRating(0);
    }
  };

  const tableColumns = [
    {
      key: "gearName",
      label: "Gear",
      render: (rental: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-200" />
          <div>
            <p className="font-medium text-slate-900">{rental.gearName}</p>
            <p className="text-sm text-slate-500">{rental.provider}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (rental: any) => (
        <span className="text-slate-700">{rental.category}</span>
      ),
    },
    {
      key: "dates",
      label: "Rental Period",
      render: (rental: any) => (
        <div className="text-sm">
          <p className="font-medium text-slate-900">{rental.startDate}</p>
          <p className="text-slate-500">{rental.endDate}</p>
        </div>
      ),
    },
    {
      key: "totalCost",
      label: "Cost",
      render: (rental: any) => (
        <div>
          <p className="font-semibold text-slate-900">${rental.totalCost}</p>
          <p className="text-sm text-slate-500">${rental.dailyRate}/day</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (rental: any) => <StatusBadge status={rental.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (rental: any) => (
        <div className="flex flex-col gap-2">
          {rental.status === "active" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCancel(rental.id)}
              disabled={cancelingId === rental.id}
              className="text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          )}
          {rental.status === "completed" && rental.rating === null && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRatingId(rental.id)}
              className="text-amber-600 hover:bg-amber-50"
            >
              <Star className="h-4 w-4" />
              Rate
            </Button>
          )}
          {rental.status === "completed" && rental.rating !== null && (
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-slate-900">
                {rental.rating}
              </span>
              <span className="text-amber-500">★</span>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-2xl">Rental History</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search rentals..."
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
        {/* Data Table */}
        <DataTable columns={tableColumns} data={paginatedRentals} />

        {/* Rating Modal */}
        {ratingId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Rate this rental</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className={`text-3xl transition-colors ${
                        star <= selectedRating
                          ? "text-amber-500"
                          : "text-slate-300 hover:text-amber-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRatingId(null);
                      setSelectedRating(0);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSubmitRating(ratingId)}
                    disabled={selectedRating === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredRentals.length)} of{" "}
              {filteredRentals.length} results
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

        {/* Empty State */}
        {paginatedRentals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <RotateCw className="h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg text-slate-600">No rentals found</p>
            <p className="text-sm text-slate-500">
              {searchQuery
                ? "Try adjusting your search criteria"
                : "You haven&apos;t rented any gear yet"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { RotateCw } from "lucide-react";
