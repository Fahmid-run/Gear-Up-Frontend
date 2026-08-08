"use server";

import { cookies } from "next/headers";
import { gearSchema } from "../_schema/gearschema";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

export const gearAction = async (prevState: any, formData: FormData) => {
  const cookie = cookies();

  const accessToken = (await cookie).get("accessToken")?.value;

  const file = formData.get("image") as File | null;
  let imagePath = "";

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");

    await mkdir(uploadDir, { recursive: true });

    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(uploadDir, uniqueName);

    // 4. Save to disk
    await writeFile(filePath, buffer);

    // 5. Public URL path to store in database
    imagePath = `/uploads/${uniqueName}`;
  }

  const rawData = {
    ...Object.fromEntries(formData.entries()),
    image: imagePath,
  };

  const validated = gearSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      values: rawData,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const payload = validated.data;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  console.log(result);

  return result;
};
