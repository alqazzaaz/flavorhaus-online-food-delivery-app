import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import ScrollReveal from "scrollreveal";
import { analyzeNutrition } from "../../Service/NutritionService";
import "./FoodItem.css";
import { useTranslation } from "react-i18next";

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);
  const { t } = useTranslation();

  // Jetzt sind name & description Strings
  const displayName = name || "";
  const displayDesc = description || "";

  // --- Popup ---
  const [showPopup, setShowPopup] = useState(false);
  const [portion, setPortion] = useState(300);
  const [loadingPopup, setLoadingPopup] = useState(false);

  // --- AI result ---
  const [nutrition, setNutrition] = useState(null);
  const [animateResult, setAnimateResult] = useState(false);

  const handleAI = async () => {
    setLoadingPopup(true);

    try {
      const textForAI = displayName; // wichtig!
      const data = await analyzeNutrition(textForAI, portion);

      setNutrition(data);
      setTimeout(() => setAnimateResult(true), 70);
    } catch (e) {
      toast.error(t("messages.aiEstimateFailed"));
    }

    setLoadingPopup(false);
    setShowPopup(false);
  };

  const handleAdd = () => {
    increaseQty(id);
    toast.success(t("messages.addedToCart"), { autoClose: 2000 });
  };

  useEffect(() => {
    ScrollReveal().reveal(".food-card-wrapper", {
      origin: "top",
      distance: "60px",
      duration: 1000,
      delay: 300,
      opacity: 0,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="food-card-wrapper">

      {/* ---------- AI POPUP ---------- */}
      {showPopup && (
        <div
          className="ai-popup-overlay"
          onClick={() => !loadingPopup && setShowPopup(false)}
        >
          <div className="ai-popup" onClick={(e) => e.stopPropagation()}>
            <h2 className="ai-popup-title">{t("modals.aiEstimateTitle")}</h2>
            <p className="ai-popup-desc">{t("modals.aiEstimateDesc")}</p>

            <div className="ai-popup-input-row">
              <input
                type="number"
                value={portion}
                onChange={(e) => setPortion(e.target.value)}
                className="ai-popup-input"
              />
              <span className="ai-popup-unit">{t("modals.grams")}</span>
            </div>

            <button
              className="ai-popup-btn"
              onClick={handleAI}
              disabled={loadingPopup}
            >
              {loadingPopup ? t("general.loading") : t("modals.estimate")}
            </button>

            {!loadingPopup && (
              <button
                className="ai-popup-cancel"
                onClick={() => setShowPopup(false)}
              >
                {t("buttons.cancel")}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---------- CARD ---------- */}
      <div className={`food-card ${animateResult ? "highlight-card" : ""}`}>
        <Link to={`/food/${id}`}>
          <img
            src={imageUrl}
            alt={displayName}   // FIXED
            className="food-image"
          />
        </Link>

        <div className="food-body">
          <h5 className="food-title">{displayName}</h5>
          <p className="food-desc">{displayDesc}</p>

          <div className="food-bottom">
            <span className="food-price">
              {price} {t("card.priceSuffix")}
            </span>
            <span className="food-rating">⭐ 4.5</span>
          </div>

          {!nutrition && (
            <button className="ai-calc-link" onClick={() => setShowPopup(true)}>
              {t("foodDetails.aiEstimate")}
            </button>
          )}

          {nutrition && (
            <div className="ai-result ai-animate">
              <div className="ai-result-label">
                {t("foodDetails.estimatedWithAI")}
              </div>
              <div>
                <strong>{t("foodDetails.calories")}:</strong>{" "}
                {nutrition.calories} kcal
              </div>
              <div className="macro">
                {t("foodDetails.protein")}: {nutrition.protein} g
              </div>
              <div className="macro">
                {t("foodDetails.carbs")}: {nutrition.carbs} g
              </div>
              <div className="macro">
                {t("foodDetails.fat")}: {nutrition.fat} g
              </div>
              <div className="macro">
                {t("foodDetails.portion")}: {portion} {t("modals.grams")}
              </div>
            </div>
          )}
        </div>

        <div className="food-footer">
          <Link className="food-btn-show" to={`/food/${id}`}>
            <i className="bi-eye"></i> {t("card.showDetails")}
          </Link>

          {quantities[id] > 0 ? (
            <div className="qty-box">
              <button className="qty-btn" onClick={() => decreaseQty(id)}>
                -
              </button>
              <span className="qty-number">{quantities[id]}</span>
              <button className="qty-btn" onClick={() => increaseQty(id)}>
                +
              </button>
            </div>
          ) : (
            <button className="food-btn-add" onClick={handleAdd}>
              <i className="bi-cart-fill"></i> {t("card.addToCart")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
