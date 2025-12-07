import axios from "axios";

export const analyzeNutrition = async (foodName, portion) => {
  const response = await axios.post(
    "https://foodrestapi-production-471c.up.railway.app/api/nutrition/analyze",
    {
      foodName,
      portion,
    }
  );
  return response.data;
};
