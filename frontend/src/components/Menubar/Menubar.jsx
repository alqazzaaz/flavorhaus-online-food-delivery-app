import React, { useContext, useState, useEffect } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ScrollReveal from "scrollreveal";
import { useTranslation } from "react-i18next";

const Menubar = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "de" ? "en" : "de";
    i18n.changeLanguage(newLang);
  };

  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { quantities, token, setToken, setQuantities } =
    useContext(StoreContext);
  const uniqueItemsInCart = quantities
    ? Object.values(quantities).filter((qty) => qty > 0).length
    : 0;
  const navigate = useNavigate();
  const location = useLocation(); // <-- location nutzen

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
    setMobileOpen(false);
  };

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1800,
      delay: 400,
    });
    sr.reveal(".navbar", { origin: "top" });
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 800 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  const handleNavClick = (path, key) => {
    setActive(key);
    setMobileOpen(false);
    navigate(path);
  };
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setActive("home");
    } else if (path.startsWith("/explore")) {
      setActive("explore");
    } else if (path.startsWith("/contact")) {
      setActive("contact-us");
    } else if (path.startsWith("/cart")) {
      setActive("cart");
    } else {
      // Fallback: entferne Highlight, wenn keine passende Route
      setActive("");
    }
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid nav-inner">
        <Link
          to="/"
          onClick={() => {
            setActive("home");
            setMobileOpen(false);
          }}
        >
          <img
            src={assets.logo}
            alt=""
            className="mx-4 logo-img"
            width={120}
            height={90}
          />
        </Link>

        {/* Desktop links (hidden on small screens via CSS) */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 worter desktop-links">
          <li className="nav-item">
            <Link
              className={
                active === "home" ? "nav-link fw-bold active" : "nav-link"
              }
              to="/"
              onClick={() => setActive("home")}
            >
              {t("navbar.home")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                active === "explore" ? "nav-link fw-bold active" : "nav-link"
              }
              to="/explore"
              onClick={() => setActive("explore")}
            >
              {t("navbar.allDishes")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                active === "contact-us" ? "nav-link fw-bold active" : "nav-link"
              }
              to="/contact"
              onClick={() => setActive("contact-us")}
            >
              {t("navbar.contact")}
            </Link>
          </li>
        </ul>

        {/* Right side icons (desktop) */}
        <div className="d-flex align-items-center gap-4 desktop-icons">
          {/* ALWAYS VISIBLE LANGUAGE BUTTON */}
          <button
            className="btn-lang-circle"
            onClick={() =>
              i18n.changeLanguage(i18n.language === "de" ? "en" : "de")
            }
          >
            <img
              src={i18n.language === "de" ? "/flags/en.svg" : "/flags/de.svg"}
              alt="lang"
              className="flag-icon-circle"
            />
          </button>

          {!token ? (
            <>
              <Link to="/login">
                <button className="btn-login">{t("navbar.login")}</button>
              </Link>
              <Link to="/register">
                <button className="btn-register">{t("navbar.register")}</button>
              </Link>
            </>
          ) : (
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block user-icon-wrapper dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <PersonIcon className="user-icon" />
              </a>
              <ul className="dropdown-menu text-small">
                <li
                  className="dropdown-item"
                  onClick={() => navigate("/myorders")}
                >
                  {t("navbar.myOrders")}
                </li>
                <li className="dropdown-item" onClick={logout}>
                  {t("navbar.logout")}
                </li>
              </ul>
            </div>
          )}

          <Link to="/cart">
            <div className="position-relative cart-icon-wrapper">
              <ShoppingCartIcon style={{ fontSize: 36, color: "white" }} />
              <span className="cart-badge">{uniqueItemsInCart}</span>
            </div>
          </Link>
        </div>


        {/* MOBILE LANGUAGE BUTTON (VISIBLE ONLY ON MOBILE) */}
        <button
          className="btn-lang-circle-mobile"
          onClick={() =>
            i18n.changeLanguage(i18n.language === "de" ? "en" : "de")
          }
        >
          <img
            src={i18n.language === "de" ? "/flags/en.svg" : "/flags/de.svg"}
            alt="lang"
            className="flag-icon-circle"
          />
        </button>

        {/* Mobile menu button (only visible on <= 800px via CSS) */}

        <button
          className="mobile-menu-btn"
          onClick={toggleMobile}
          aria-label="Menü"
        >
          {mobileOpen ? (
            <CloseIcon style={{ color: "white" }} />
          ) : (
            <MenuIcon style={{ color: "white" }} />
          )}
        </button>
      </div>

      {/* Mobile full-width menu (shown only when mobileOpen && <= 800px) */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-links">
          <button
            className="mobile-link"
            onClick={() => handleNavClick("/", "home")}
          >
            {t("navbar.home")}
          </button>
          <button
            className="mobile-link"
            onClick={() => handleNavClick("/explore", "explore")}
          >
            {t("navbar.allDishes")}
          </button>
          <button
            className="mobile-link"
            onClick={() => handleNavClick("/contact", "contact-us")}
          >
            {t("navbar.contact")}
          </button>

          <div className="mobile-sep" />

          {/* user / cart row */}
          <div className="mobile-icons">
            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mobile-icon-link"
                >
                  {t("navbar.login")}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="mobile-icon-link"
                >
                  {t("navbar.register")}
                </Link>
              </>
            ) : (
              <>
                <button
                  className="mobile-icon-btn"
                  onClick={() => {
                    navigate("/myorders");
                    setMobileOpen(false);
                  }}
                >
                  <PersonIcon /> {t("navbar.myOrders")}
                </button>
                <button className="mobile-icon-btn" onClick={logout}>
                  <PersonIcon /> {t("navbar.logout")}
                </button>
              </>
            )}

            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="mobile-cart-link"
            >
              <ShoppingCartIcon /> {t("navbar.cart")} ({uniqueItemsInCart})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
