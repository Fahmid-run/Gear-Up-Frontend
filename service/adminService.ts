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
