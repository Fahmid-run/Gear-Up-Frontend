"use server";

import { cookies } from "next/headers";

interface IRentalPaylaod {
  startDate: Date;
  endDate: Date;
  items: any;
}

export const createRentalItem = async (payload: IRentalPaylaod) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getMyRentalOrders = async () => {
  try {
    const cookie = cookies();

    const accessToken = (await cookie).get("accessToken")?.value;
    if (!accessToken) {
      return {
        success: false,
        message: "Forbidden",
      };
    }
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/rentals`,
      {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 60,
          tags: ["rental orders"],
        },
      },
    );

    const result = res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
