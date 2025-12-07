import React, { useRef, useEffect } from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css";
import ScrollReveal from "scrollreveal";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1800,
      delay: 400,
    });

    sr.reveal(".explore-menu", {
      origin: "left",
    });
  }, []);

  const handleCategoryClick = (itemCategory) => {
    if (location.pathname === "/explore") {
      setCategory(itemCategory);
    } else {
      navigate("/explore", { state: { category: itemCategory } });
    }
  };

  const mapCategoryKey = (cat) => {
    if (!cat) return "";
    const lower = cat.toLowerCase();
    if (lower === "arabisches") return "arabic";
    if (lower === "getränke") return "drinks";
    return lower;
  };

  return (
    <div className="explore-menu position-relative">
      <div className="d-flex align-items-center justify-content-between my-title">
        {/* Überschrift kannst du auch auf einen eigenen Key legen, z. B. menu.title */}
        <h3 className="text-center ">
          {t("menu.title", "Unsere Speisekarte")}
        </h3>

        <div className="d-flex ms-3">
          <i
            className="bi bi-arrow-left-circle scroll-icon"
            onClick={scrollLeft}
          ></i>
          <i
            className="bi bi-arrow-right-circle scroll-icon"
            onClick={scrollRight}
          ></i>
        </div>
      </div>

      <div
        className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list"
        ref={menuRef}
      >
        {categories.map((item, index) => {
          const key = mapCategoryKey(item.category);
          const isActive =
            item.category === category && location.pathname === "/explore";

          return (
            <div
              key={index}
              className="text-center explore-menu-list-item"
              onClick={() => handleCategoryClick(item.category)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCategoryClick(item.category);
              }}
            >
              <img
                src={item.icon}
                alt={item.category}
                className={`rounded-circle ${isActive ? "active" : ""}`}
                height={100}
                width={128}
              />
              <p className="mt-2 fwbold">
                {t(`categories.${key}`, item.category)}
              </p>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
