import axios from "axios";
import i18n from "../i18n";

const API_URL = "https://foodrestapi-production-471c.up.railway.app/api/foods";

export const fetchFoodList = async () => {
  try {
    const lang = i18n.language;

    const response = await axios.get(API_URL, {
      params: { lang },
    });

    return response.data;
  } catch (error) {
    console.log("Fehler beim Abrufen der Gerichtenliste", error);
    throw error;
  }
};

export const fetchFoodDetails = async (id) => {
  try {
    const lang = i18n.language;

    const response = await axios.get(`${API_URL}/${id}`, {
      params: { lang },
    });

    return response.data;
  } catch (error) {
    console.log("Fehler beim Abrufen der Gerichtendetails", error);
    throw error;
  }
};
