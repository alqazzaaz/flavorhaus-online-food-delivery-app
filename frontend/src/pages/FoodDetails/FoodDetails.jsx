import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchFoodDetails } from "../../Service/foodService";
import { analyzeNutrition } from "../../Service/NutritionService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import ScrollReveal from "scrollreveal";
import "./FoodDetails.css";
import { useTranslation } from "react-i18next";

const FoodDetails = () => {
  const { id } = useParams();
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);
  const { t, i18n } = useTranslation();

  const [data, setData] = useState({});
  const [showAI, setShowAI] = useState(false);
  const [portion, setPortion] = useState(300);
  const [loading, setLoading] = useState(false);
  const [nutrition, setNutrition] = useState(null);

  const lang = i18n.language;

  const translateCategory = (cat) => {
    return t(`categoryMap.${cat}`, cat);
  };

  // Holt die richtige Sprache oder einen Ersatzstring
  const name =
    typeof data.name === "object"
      ? data.name?.[lang] || data.name?.de || ""
      : data.name || "";

  const desc =
    typeof data.description === "object"
      ? data.description?.[lang] || data.description?.de || ""
      : data.description || "";

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        const foodData = await fetchFoodDetails(id); // backend liefert name = "..." (string)
        setData(foodData);
      } catch (error) {
        toast.error(t("messages.fetchFoodError"));
      }
    };
    loadFoodDetails();
  }, [id, t]);

  useEffect(() => {
    ScrollReveal().reveal(".py-5", {
      origin: "top",
      distance: "60px",
      duration: 1000,
      delay: 200,
      opacity: 0,
      easing: "ease-in-out",
    });
  }, []);

  const addToCart = () => {
    if (!data.id) return;
    increaseQty(data.id);
    toast.success(t("messages.addedToCart"));
  };

  const handleAI = async () => {
    if (!name) {
      toast.error(t("messages.foodNotLoaded"));
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeNutrition(name, portion);
      setNutrition(result);
      setShowAI(false);
    } catch {
      toast.error(t("messages.aiEstimateFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showAI && (
        <div
          className="ai-popup-overlay"
          onClick={() => !loading && setShowAI(false)}
        >
          <div className="ai-popup" onClick={(e) => e.stopPropagation()}>
            <h4>{t("modals.aiEstimateTitle")}</h4>
            <p>{t("modals.aiEstimateDesc")}</p>

            <div className="ai-popup-input-row">
              <input
                type="number"
                value={portion}
                onChange={(e) => setPortion(e.target.value)}
                className="ai-popup-input"
              />
              <span className="ai-popup-input-unit">{t("modals.grams")}</span>
            </div>

            <div className="ai-popup-buttons">
              <button
                className="ai-popup-cancel"
                disabled={loading}
                onClick={() => setShowAI(false)}
              >
                {t("buttons.cancel")}
              </button>
              <button
                className="ai-popup-ok"
                disabled={loading}
                onClick={handleAI}
              >
                {loading ? t("general.loading") : t("modals.estimate")}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="py-5">
        <div className="explore-header">
          <Link to="/explore" className="arrow-btn">
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>

        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            {/* IMAGE */}
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={data.imageUrl}
                alt={name}
              />
            </div>

            {/* DETAILS */}
            <div className="col-md-6">
              <div className="fs-5 mb-1">
                {t("foodDetails.category")}:{" "}
                <span className="badge text-bg-warning">
                  {translateCategory(data.category)}
                </span>
              </div>

              <h1 className="display-5 fw-bold">{name}</h1>

              <div className="fs-5 mb-2">
                <span>{data.price} €</span>
              </div>

              <p className="lead">{desc}</p>

              {!nutrition && (
                <button
                  className="btn btn-link p-0 mb-3 ai-details-link"
                  onClick={() => setShowAI(true)}
                >
                  {t("foodDetails.aiEstimate")}
                </button>
              )}

              {nutrition && (
                <div className="ai-details-result animate-slide-in">
                  <div className="ai-result-label">
                    {t("foodDetails.estimatedWithAI")}
                  </div>
                  <div>
                    <strong>{t("foodDetails.calories")}:</strong>{" "}
                    {nutrition.calories} kcal
                  </div>
                  <div>
                    <strong>{t("foodDetails.protein")}:</strong>{" "}
                    {nutrition.protein} g
                  </div>
                  <div>
                    <strong>{t("foodDetails.carbs")}:</strong> {nutrition.carbs}{" "}
                    g
                  </div>
                  <div>
                    <strong>{t("foodDetails.fat")}:</strong> {nutrition.fat} g
                  </div>
                  <div className="mt-2">
                    <strong>{t("foodDetails.portion")}:</strong> {portion}{" "}
                    {t("modals.grams")}
                  </div>
                </div>
              )}

              <div className="d-flex align-items-center gap-3 mt-4">
                {quantities[data.id] > 0 ? (
                  <>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => decreaseQty(data.id)}
                    >
                      -
                    </button>
                    <span className="fw-bold fs-5">{quantities[data.id]}</span>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => increaseQty(data.id)}
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button className="btn btn-outline-dark" onClick={addToCart}>
                    <i className="bi-cart-fill me-1"></i>
                    {t("foodDetails.addToCart")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodDetails;
