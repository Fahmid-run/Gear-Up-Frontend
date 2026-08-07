"use server";

import { cookies } from "next/headers";

export const getAllUser = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};

export const getStates = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/stats`, {
    headers: {
      method: "GET",
      Authorization: `${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};

export const getAllRentals = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};

export const getAllGears = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/gears`, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};

export const getAllPayments = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/all`, {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  return res.json();
};
