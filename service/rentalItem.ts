"use server";

import { cookies } from "next/headers";

interface IRentalPaylaod {
  id: string;
  startDate: Date;
  endDate: Date;
  items: any;
}

export const createRentalItem = async (payload: IRentalPaylaod) => {
  try {
    const cookie = cookies();
    const accessToken = (await cookie).get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

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
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "GET",
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    const result = await res.json();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const getProviderRentalOrders = async () => {
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
      },
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateRentalORderStatus = async (
  rentalOrderId: string,
  rentalStatus: "CONFIRMED" | "PICKED_UP" | "RETURNED",
) => {
  try {
    const cookie = cookies();

    const accessToken = (await cookie).get("accessToken")?.value;
    if (!accessToken) {
      return {
        success: false,
        message: "Forbidden",
      };
    }

    const payload = {
      rentalStatus,
    };
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/orders/${rentalOrderId}`,
      {
        method: "PATCH",
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
