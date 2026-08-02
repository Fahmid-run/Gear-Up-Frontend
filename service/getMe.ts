import { cookies } from "next/headers";
import { success } from "zod";

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
  });

  const result = res.json();

  return result;
};
