export const getGears = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
    method: "GET",
  });

  const result = res.json();

  return result;
};
