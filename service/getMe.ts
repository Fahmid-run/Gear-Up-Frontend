import { cookies } from "next/headers";

export const getMe = async () => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken");
  if (!accessToken) {
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};
