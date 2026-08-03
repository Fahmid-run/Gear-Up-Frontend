"use server";

import { cookies } from "next/headers";
import { gearSchema } from "../_schema/gearschema";

export const gearAction = async (prevState: any, formdata: FormData) => {
  const rawData = Object.fromEntries(formdata.entries());

  const validated = gearSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      values: rawData,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const payload = validated.data;

  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
};
