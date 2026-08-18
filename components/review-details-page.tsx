export interface GearReview {
  id: string;
  gearId: string;
  gearName: string;
  providerName: string;
  reviewerName: string;
  rating: number;
  description: string;
  date: string;
}

export const reviews: GearReview[] = [
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

export function StarRating({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={index < value ? "text-amber-400" : "text-slate-300"}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-sm font-semibold text-slate-700">
        {value}.0
      </span>
    </div>
  );
}

export function getGearReviews(gearId: string) {
  return reviews.filter(
    (review) => review.gearId.toLowerCase() === gearId.toLowerCase(),
  );
}

export function getGearById(gearId: string) {
  return reviews.find(
    (review) => review.gearId.toLowerCase() === gearId.toLowerCase(),
  );
}

export function averageRating(items: GearReview[]) {
  return items.length
    ? items.reduce((sum, review) => sum + review.rating, 0) / items.length
    : 0;
}
