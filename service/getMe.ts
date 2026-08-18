"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getMe = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      Authorization: `${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60,
      tags: ["myProfile"],
    },
  });

  const result = res.json();

  return result;
};

export const getUser = async (id: string) => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/user/${id}`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    },
  );

  const result = res.json();

  return result;
};

export const logout = async () => {
  const cookie = await cookies();

  cookie.delete("accessToken");
  cookie.delete("refreshToken");

  revalidateTag("myProfile", "max");
};
