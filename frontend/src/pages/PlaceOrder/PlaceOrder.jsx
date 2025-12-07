import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PlaceOrder = () => {
  const { foodList, quantities, token } = useContext(StoreContext);
  const { t } = useTranslation();

  const translateCategory = (cat) => {
    return t(`categoryMap.${cat}`, cat);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  // Wandelt name/description IMMER sicher in String um
  const safeText = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object")
      return value.de || Object.values(value)[0] || "";
    return "";
  };

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const { subtotal, shipping, total } = calculateCartTotals(
    cartItems,
    quantities
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert(t("messages.loginRequired"));
      return;
    }

    try {
      const orderedItems = cartItems.map((item) => ({
        foodId: item.id,
        quantity: quantities[item.id],
        price: item.price,
        name: safeText(item.name), // FIXED
        description: safeText(item.description), // FIXED
        imageUrl: item.imageUrl,
        category: item.category,
      }));

      const orderRequest = {
        orderedItems,
        userAddress: `${address}, ${zip}`,
        amount: total,
        email,
        phoneNumber,
        orderStatus: "PENDING",
      };

      const response = await axios.post(
        "https://foodrestapi-production-471c.up.railway.app/api/orders/create",
        orderRequest,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      alert("Fehler bei der Bestellung");
    }
  };

  return (
    <div className="container placeorder-container mt-4">
      <div className="text-center mb-4">
        <img src={assets.logo} alt="logo" width="120" className="mb-3" />
        <h2>{t("placeOrder.title")}</h2>
      </div>

      <div className="row g-5">
        {/* LEFT FORM */}
        <div className="col-lg-7">
          <div className="form-box p-4 shadow-sm rounded-4 bg-white">
            <h4 className="mb-4 fw-semibold">{t("placeOrder.detailsTitle")}</h4>

            <form onSubmit={handleSubmit} className="row g-3">
              {/* FIRST NAME */}
              <div className="col-md-6">
                <label className="form-label">
                  {t("placeOrder.firstName")}
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder={t("placeOrder.firstNamePlaceholder")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              {/* LAST NAME */}
              <div className="col-md-6">
                <label className="form-label">{t("placeOrder.lastName")}</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder={t("placeOrder.lastNamePlaceholder")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="col-12">
                <label className="form-label">{t("placeOrder.email")}</label>
                <input
                  type="email"
                  className="form-control custom-input"
                  placeholder={t("placeOrder.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* PHONE */}
              <div className="col-12">
                <label className="form-label">{t("placeOrder.phone")}</label>
                <input
                  type="tel"
                  className="form-control custom-input"
                  placeholder={t("placeOrder.phonePlaceholder")}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              {/* ADDRESS */}
              <div className="col-12">
                <label className="form-label">{t("placeOrder.address")}</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder={t("placeOrder.addressPlaceholder")}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* COUNTRY */}
              <div className="col-md-5">
                <label className="form-label">{t("placeOrder.country")}</label>
                <select
                  className="form-select custom-input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">{t("placeOrder.countryPlaceholder")}</option>
                  <option value="Deutschland">{t("placeOrder.a")}</option>
                </select>
              </div>

              {/* STATE */}
              <div className="col-md-4">
                <label className="form-label">{t("placeOrder.state")}</label>
                <select
                  className="form-select custom-input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value="">{t("placeOrder.statePlaceholder")}</option>
                  <option value="Nordrhein-Westfalen">
                    {t("placeOrder.b")}
                  </option>
                </select>
              </div>

              {/* ZIP */}
              <div className="col-md-3">
                <label className="form-label">{t("placeOrder.zip")}</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder={t("placeOrder.zipPlaceholder")}
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>

              {/* SUBMIT */}
              <div className="col-12 mt-3">
                <button
                  className="placeorder-btn"
                  type="submit"
                  disabled={cartItems.length === 0}
                >
                  {t("placeOrder.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT CART SUMMARY */}
        <div className="col-lg-5">
          <div className="cart-box shadow-sm p-4 rounded-4 bg-white">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold">{t("cart.title")}</span>
              <span className="badge bg-warning text-dark rounded-pill">
                {cartItems.length}
              </span>
            </h4>

            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between lh-sm border-0 pb-2"
                >
                  <div>
                    <h6 className="my-0 fw-medium">{safeText(item.name)}</h6>
                    <small className="text-muted">
                      {t("cart.quantity")}: {quantities[item.id]}
                    </small>
                  </div>
                  <span className="fw-semibold">
                    {(item.price * quantities[item.id]).toFixed(2)}€
                  </span>
                </li>
              ))}

              <li className="list-group-item d-flex justify-content-between border-0">
                <span>{t("cart.shipping")}</span>
                <span>
                  {subtotal === 0 ? "0.00€" : shipping.toFixed(2) + "€"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between border-0 mt-2 pt-2 border-top">
                <strong>{t("cart.total")}</strong>
                <strong>{total.toFixed(2)}€</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
