"use server";

interface IRentalPaylaod {
  startDate: Date;
  endDate: Date;
  items: any;
}

export const createRentalItem = async (payload: IRentalPaylaod) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRentalOrders = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/rentals`,
      {
        method: "GET",
      },
    );

    const result = res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
