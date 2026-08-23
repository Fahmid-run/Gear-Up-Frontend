"use server";

import { cookies } from "next/headers";

export const createReview = async (payload: {
  gearItemId: string;
  rating: number;
  review: string;
}) => {
  try {
    const cookie = cookies();
    const accessToken = (await cookie).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews/${payload.gearItemId}`,
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
  } catch (error) {
    console.log(error);
  }
};

export const getReviews = async (gearItemId: string) => {
  try {
    const cookie = cookies();
    const accessToken = (await cookie).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews/${gearItemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      },
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
