"use server";

import { getMyRentalOrders } from "@/service/rentalItem";
import { cookies } from "next/headers";
import { z } from "zod";
import jwt from "jsonwebtoken";

const reviewSchema = z.object({
  review: z
    .string()
    .min(1, "Review is required")
    .min(10, "Review must be at least 10 characters"),
  rating: z.coerce
    .number({ invalid_type_error: "Rating must be a number" })
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
});

export type ReviewValues = z.infer<typeof reviewSchema>;

export async function submitReview(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const cookie = cookies();
  const accessToken = (await cookie).get("accessToken")?.value;
  const review = formData.get("review");
  const rating = formData.get("rating");
  const gearItemId = formData.get("gearItemId");

  const customerId = jwt.decode(accessToken)?.authorId;

  console.log(gearItemId);

  const rawData = {
    review,
    rating,
  };
  // Validate with Zod
  const validatedData = reviewSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      values: rawData,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const payload = {
    ...validatedData.data,
    gearItemId,
    customerId,
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/${gearItemId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  return result;
}
