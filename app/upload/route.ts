import { File } from "buffer";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req) {
  const data = await req.formData();

  const file = data.get("image") as File;

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;

  const uploadPath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    imageUrl: `/uploads/${filename}`,
  });
}
