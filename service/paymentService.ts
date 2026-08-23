"use server";

import { cookies } from "next/headers";

export const paymentInitialization = async (rentalOrderId: string) => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/checkout-session/${rentalOrderId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    },
  );

  const result = await res.json();

  return result;
};

export const getPaymentList = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/`, {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  const result = await res.json();

  return result;
};

export const getSinglePayments = async (paymnentId: string) => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/${paymnentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `${accessToken}`,
      },
    },
  );
  const result = await res.json();

  return result;
};
