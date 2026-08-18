"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface GearReview {
  id: string;
  gearId: string;
  gearName: string;
  providerName: string;
  reviewerName: string;
  rating: number;
  description: string;
  date: string;
}

const reviews: GearReview[] = [
  {
    id: "REV-1048",
    gearId: "GEAR-001",
    gearName: "Mountain Bike Pro",
    providerName: "Summit Outfitters",
    reviewerName: "Maya Chen",
    rating: 5,
    description:
      "Excellent bike with smooth gears and responsive brakes. Perfect for the trail ride.",
    date: "Aug 12, 2026",
  },
  {
    id: "REV-1047",
    gearId: "GEAR-014",
    gearName: "Camping Tent 4P",
    providerName: "Wild North Rentals",
    reviewerName: "Jordan Lee",
    rating: 4,
    description:
      "Spacious and easy to set up. Kept us dry through a rainy weekend.",
    date: "Aug 10, 2026",
  },
  {
    id: "REV-1046",
    gearId: "GEAR-008",
    gearName: "Kayak Single",
    providerName: "Coastal Gear Co.",
    reviewerName: "Avery Brooks",
    rating: 5,
    description:
      "Very stable on the water and lightweight enough to carry alone.",
    date: "Aug 8, 2026",
  },
  {
    id: "REV-1045",
    gearId: "GEAR-023",
    gearName: "Hiking Backpack 60L",
    providerName: "Trailhead Supply",
    reviewerName: "Noah Williams",
    rating: 4,
    description:
      "Comfortable straps and plenty of storage for a full-day hike.",
    date: "Aug 5, 2026",
  },
  {
    id: "REV-1044",
    gearId: "GEAR-006",
    gearName: "Rock Climbing Rope",
    providerName: "Summit Outfitters",
    reviewerName: "Sofia Patel",
    rating: 5,
    description:
      "High quality rope in great condition. The provider was helpful too.",
    date: "Aug 2, 2026",
  },
  {
    id: "REV-1043",
    gearId: "GEAR-031",
    gearName: "Portable Camp Stove",
    providerName: "Wild North Rentals",
    reviewerName: "Liam Carter",
    rating: 3,
    description: "Worked reliably, although the ignition took a few tries.",
    date: "Jul 28, 2026",
  },
];

function Rating({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={
            index < value
              ? "size-4 fill-amber-400 text-amber-400"
              : "size-4 text-slate-300"
          }
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-slate-700">
        {value}.0
      </span>
    </div>
  );
}

export function ReviewsPage({ gears, review }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filteredReviews = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return review.filter((rev) =>
      [rev.review, rev.rating].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleReviews = filteredReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Gear feedback
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Reviews
          </h1>
          <p className="text-lg text-slate-600">
            Browse customer feedback across all gear listings.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Total reviews</CardDescription>
              <CardTitle className="text-3xl">{reviews.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Average rating</CardDescription>
              <CardTitle className="flex items-center gap-2 text-3xl">
                {averageRating.toFixed(1)}{" "}
                <Star className="size-6 fill-amber-400 text-amber-400" />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Five-star reviews</CardDescription>
              <CardTitle className="text-3xl">
                {reviews.filter((review) => review.rating === 5).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                Review description, rating, gear, and provider details.
              </CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                aria-label="Search reviews"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search gear, provider, or review..."
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {visibleReviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 md:flex-row md:items-start md:justify-between"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm text-slate-500">
                      {gears.gearId}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    {review.review}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                    <span>
                      Provider:{" "}
                      <strong className="font-medium text-slate-700">
                        {/* {review.} */}
                        test
                      </strong>
                    </span>
                    <span>Reviewed by {review.reviewerName}</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 md:items-end">
                  <Rating value={review.rating} />
                  <span className="text-xs text-slate-500">
                    {review.date} · {review.id}
                  </span>
                </div>
              </article>
            ))}
            {visibleReviews.length === 0 && (
              <p className="py-12 text-center text-sm text-slate-500">
                No reviews match your search.
              </p>
            )}
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing {visibleReviews.length} of {filteredReviews.length}{" "}
                reviews
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-600">
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(pageCount, current + 1))
                  }
                  disabled={currentPage === pageCount}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
