"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type loginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

type registerState = {
  success: boolean;
  statusCode: number;
  message: string;
};

export const loginAction = async (
  prevState: loginState,
  formdata: FormData,
) => {
  const password = formdata.get("email");
  const email = formdata.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookieState = await cookies();

    cookieState.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookieState.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    redirect("/dashboard", "replace");
  }

  return result;
};

export const SignUpAction = async (
  prevState: registerState,
  formdata: FormData,
) => {
  const paylaod = {
    name: formdata.get("name"),
    email: formdata.get("email"),
    password: formdata.get("password"),
    role: formdata.get("role"),
    phone: formdata.get("phone"),
    address: formdata.get("address"),
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paylaod),
  });
  const result = res.json();

  redirect("/login", "replace");

  return result;
};
