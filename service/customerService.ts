"use server";

import { cookies } from "next/headers";

export const getCustomerStates = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/customer/stats`, {
    method: "POST",
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};
