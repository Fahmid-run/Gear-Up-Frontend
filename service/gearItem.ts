"use server";

import { cookies } from "next/headers";

export const getMyGear = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  const result = await res.json();

  return result;
};

export const getGearItemById = async (gearItemId: string) => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear/${gearItemId}`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    },
  );

  const result = await res.json();

  return result;
};
