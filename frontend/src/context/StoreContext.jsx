import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { fetchFoodList } from "../Service/foodService";
import {
  addToCart,
  deleteItemFromCart,
  getCartData,
  removeQtyFromCart,
} from "../Service/cartService";
import { useTranslation } from "react-i18next";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    await addToCart(foodId, token);
  };

  const decreaseQty = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
    await removeQtyFromCart(foodId, token);
  };

  const removeFromCart = async (foodId) => {
    await deleteItemFromCart(foodId, token);

    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[foodId];
      return updated;
    });
  };

  const loadCartData = async (token) => {
    const items = await getCartData(token);
    setQuantities(items || {});
  };

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
    lang,
  };

  useEffect(() => {
  async function localData() {
    const data = await fetchFoodList();  // fetchFoodList liest jetzt automatisch die Sprache
    setFoodList(data);

    if (localStorage.getItem("token")) {
      const stored = localStorage.getItem("token");
      setToken(stored);
      await loadCartData(stored);
    }
  }

  localData();
}, [i18n.language]);     // <-- FIX: neu laden bei Sprachenwechsel


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
