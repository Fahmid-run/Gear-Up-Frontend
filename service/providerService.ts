"use server";

import { configs } from "@/app/utils/configs";
import { verfiyToken } from "@/app/utils/jwt";
import { cookies } from "next/headers";

export const providerOverviewStats = async () => {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get("accessToken")?.value;

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

export const deleteGear = async (gearId: string) => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/gear/${gearId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `${accessToken}`,
      },
    },
  );

  const result = res.json();

  return result;
};
