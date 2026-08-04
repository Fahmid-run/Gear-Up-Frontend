"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star } from "lucide-react";
import {
  ReviewFormState,
  submitReview,
} from "@/app/dashboard/customer/review/_actions/reviewAction";
import { useParams } from "next/navigation";

export function ReviewForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [state, formAction, isPending] = useActionState<ReviewFormState>(
    submitReview,
    false,
  );

  const { id } = useParams();

  return (
    <form
      action={formAction}
      className="w-full max-w-md space-y-6 border-2 p-10 rounded-2xl"
    >
      {/* Success Message */}
      {state?.success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {state?.success === false && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Rating Field */}
      <div className="space-y-3">
        <Label htmlFor="rating" className="text-base font-medium">
          Rating
        </Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={star}
                className="sr-only"
                disabled={isPending}
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <Star
                className={`h-8 w-8 transition-all hover:scale-110 ${
                  rating !== null && star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                strokeWidth={1.5}
              />
            </label>
          ))}
        </div>
        {state?.errors?.rating && (
          <p className="text-sm text-red-600">{state.errors.rating[0]}</p>
        )}
      </div>

      <input type="hidden" name="gearItemId" value={id} />

      {/* Review Field */}
      <div className="space-y-3">
        <Label htmlFor="review" className="text-base font-medium">
          Review
        </Label>
        <Textarea
          id="review"
          name="review"
          placeholder="Share your experience... (at least 10 characters)"
          className="min-h-[120px] resize-none"
          disabled={isPending}
        />
        {state?.errors?.review && (
          <p className="text-sm text-red-600">{state.errors.review[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
