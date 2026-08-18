"use server";

export const getGears = async () => {
  console.log(process.env.BACKEND_API_URL);
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
    method: "GET",
  });

  const result = res.json();

  return result;
};

export const getGearById = async (gearID: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearID}`, {
    method: "GET",
  });

  const result = res.json();

  return result;
};
