"use server";

import { cookies } from "next/headers";

export const providerOverviewStats = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/stats`, {
    headers: {
      method: "GET",
      Authorization: `${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};

export const getProviderPayments = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/provider`,
    {
      headers: {
        method: "GET",
        Authorization: `${accessToken}`,
      },
    },
  );

  const result = res.json();

  return result;
};
