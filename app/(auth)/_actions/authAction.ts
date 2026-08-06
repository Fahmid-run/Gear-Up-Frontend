"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loginSchema, registerSchema } from "../_schema/authSchema";

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
  const rawData = Object.fromEntries(formdata.entries());

  const validated = loginSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      values: rawData,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const payload = validated.data;

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

    const decodedJwt = jwt.decode(result.data.accessToken) as JwtPayload;

    if (decodedJwt.role === "Customer") {
      redirect("/dashboard/customer", "replace");
    }
    if (decodedJwt.role === "Provider") {
      redirect("/dashboard/provider", "replace");
    }

    if (decodedJwt.role === "Admin") {
      redirect("/dashboard/admin", "replace");
    }
  }

  return result;
};

export const SignUpAction = async (
  prevState: registerState,
  formdata: FormData,
) => {
  const rawData = Object.fromEntries(formdata.entries());

  const validated = registerSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      values: rawData,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const payload = validated.data;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = res.json();

  return result;
  redirect("/login", "replace");
};
