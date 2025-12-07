import axios from "axios";

const API_URL = "https://foodrestapi-production-471c.up.railway.app/api/cart";

export const addToCart = async (foodId, token) => {
  try {
    await axios.post(
      API_URL,
      { foodId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(
      "Beim Hinzufügen zum Warenkorb ist ein Fehler aufgetreten.",
      error
    );
  }
};

export const removeQtyFromCart = async (foodId, token) => {
  try {
    await axios.post(
      API_URL + "/remove",
      { foodId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(
      "Beim Entfernen aus dem Warenkorb ist ein Fehler aufgetreten.",
      error
    );
  }
};

export const deleteItemFromCart = async (foodId, token) => {
  try {
    await axios.delete(API_URL + "/item", {
      headers: { Authorization: `Bearer ${token}` },
      data: { foodId },
    });
  } catch (error) {
    console.error("Fehler beim kompletten Entfernen", error);
  }
};

export const getCartData = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.items;
  } catch (error) {
    console.error("Fehler beim Abrufen des Warenkorbinhalts", error);
  }
};
