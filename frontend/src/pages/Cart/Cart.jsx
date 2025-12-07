import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { calculateCartTotals } from "../../util/cartUtils";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const navigate = useNavigate();
  const {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
  } = useContext(StoreContext);

  const { t } = useTranslation();

  const translateCategory = (cat) => {
  return t(`categoryMap.${cat}`, cat);
};


  // CART ITEMS filtern
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  // FIX: Falls name oder description noch ein altes Objekt ist → String extrahieren
  const safeText = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") return value.de || Object.values(value)[0] || "";
    return "";
  };

  const { subtotal, shipping, total } = calculateCartTotals(
    cartItems,
    quantities
  );

  return (
    <div className="container py-5">
      <h1 className="mb-5">{t("cart.title")}</h1>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <p>{t("cart.empty")}</p>
          ) : (
            <div className="cart-card mb-4">
              {cartItems.map((food) => {
                const name = safeText(food.name);
                const desc = safeText(food.description);

                return (
                  <div key={food.id} className="row cart-item">
                    <div className="col-md-3 d-flex justify-content-center">
                      <img src={food.imageUrl} alt={name} className="cart-img" />
                    </div>

                    <div className="col-md-5">
                      <h5 className="cart-title">{name}</h5>
                      <p className="cart-category">
                        {t("cart.categoryLabel")}: {food.category}
                      </p>
                      <p className="cart-description">{desc}</p>
                    </div>

                    <div className="col-md-2 d-flex align-items-center">
                      <div className="qty-container">
                        <button
                          className="qty-btn"
                          onClick={() => decreaseQty(food.id)}
                        >
                          -
                        </button>

                        <span className="qty-display">{quantities[food.id]}</span>

                        <button
                          className="qty-btn"
                          onClick={() => increaseQty(food.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-md-2 text-end">
                      <p className="cart-price">
                        {(food.price * quantities[food.id]).toFixed(2)} €
                      </p>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(food.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-start mb-4">
            <Link to="/" className="btn btn-outline-primary btn-shop">
              <i className="bi bi-arrow-left me-2"></i>
              {t("buttons.continueShopping")}
            </Link>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="cart-summary">
            <h5 className="card-title mb-4">{t("cart.summaryTitle")}</h5>

            <div className="summary-line">
              <span>{t("cart.subtotal")}</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>

            <div className="summary-line">
              <span>{t("cart.shipping")}</span>
              <span>{subtotal === 0 ? 0.0 : shipping.toFixed(2)} €</span>
            </div>

            <hr />

            <div className="summary-line summary-total mb-4">
              <span>{t("cart.total")}</span>
              <span>{subtotal === 0 ? 0.0 : total.toFixed(2)} €</span>
            </div>

            <button
              className="btn-checkout w-100"
              disabled={cartItems.length === 0}
              onClick={() => {
                if (!token) {
                  alert(t("messages.loginRequired"));
                  navigate("/login");
                  return;
                }
                navigate("/order");
              }}
            >
              {t("cart.checkout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
