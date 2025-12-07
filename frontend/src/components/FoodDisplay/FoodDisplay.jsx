import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import { useTranslation } from "react-i18next";

const FoodDisplay = ({ category, searchText }) => {
  const { foodList } = useContext(StoreContext);
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  const filteredFoods = foodList.filter((food) => {
    const name = food.name?.[lang] || "";
    const matchesCategory = category === "All" || food.category === category;
    const matchesSearch = name.toLowerCase().includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-grid">
      {filteredFoods.length > 0 ? (
        filteredFoods.map((food) => (
          <FoodItem
            key={food.id}
            id={food.id}
            imageUrl={food.imageUrl}
            price={food.price}
            // WICHTIG: jetzt als STRING an FoodItem geben!
            name={food.name[lang]}
            description={food.description[lang]}
          />
        ))
      ) : (
        <div className="no-items">
          <h4>{t("card.noItems")}</h4>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
