import React, { useState, useEffect } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import "./ExploreFood.css";
import ScrollReveal from "scrollreveal";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


const ExploreFood = () => {
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const { t } = useTranslation();

  



  useEffect(() => {
    if (location.state && location.state.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1400,
      delay: 300,
    });

    sr.reveal(".explore-container", {
      origin: "top",
    });
  }, []);

  return (
    <>
      <div className="explore-container">
        <div className="explore-header">
          <Link to="/" className="arrow-btn">
            <i className="bi bi-arrow-left "></i>
          </Link>
        </div>

        <div className="explore-filter-box">
          <select
            className="explore-select"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="All">
              {t("explorePage.filterAll")} {/* "Alles" / "All" */}
            </option>
            <option value="Pizza">{t("categories.pizza")}</option>
            <option value="Pasta">{t("categories.pasta")}</option>
            <option value="Burger">{t("categories.burger")}</option>
            <option value="Arabisches">{t("categories.arabic")}</option>
            <option value="Salat">{t("categories.salad")}</option>
            <option value="Dessert">{t("categories.dessert")}</option>
            <option value="Getränke">{t("categories.drinks")}</option>
          </select>

          <input
            type="text"
            className="explore-search"
            placeholder={t("explorePage.searchPlaceholder")}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />

          <button
            className="explore-btn"
            type="button"
            aria-label={t("explorePage.searchPlaceholder")}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>

      <FoodDisplay category={category} searchText={searchText} />
    </>
  );
};

export default ExploreFood;
