import React, { useEffect } from "react";
import "./Testimonials.css";
import { assets } from "../../assets/assets";
import ScrollReveal from "scrollreveal";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1700,
      delay: 400,
    });

    sr.reveal(".testimonials .heading-container", {
      origin: "left",
    });
    sr.reveal(".testimonial-content .t-box", {
      origin: "bottom",
      interval: 200,
    });
    sr.reveal(".newsletter", {
      origin: "top",
    });
  }, []);

  return (
    <section className="testimonials" id="testimonials">
      <h2 className="heading-container">{t("testimonials.title")}</h2>

      <div className="testimonial-content container">
        <div className="t-box">
          <div className="stars">
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
          </div>
          <p>{t("testimonials.review1")}</p>
          <div className="profile">
            <img src={assets.me2} alt="Abdullah Al-Qazzaz" />
            <div className="profile-data">
              <h3>Abdullah Al-Qazzaz</h3>
              <span></span>
            </div>
          </div>
        </div>

        <div className="t-box">
          <div className="stars">
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
          </div>
          <p>{t("testimonials.review2")}</p>
          <div className="profile">
            <img src={assets.me} alt="Mohammad El Zein" />
            <div className="profile-data">
              <h3>Mohammad El Zein</h3>
              <span></span>
            </div>
          </div>
        </div>

        <div className="t-box">
          <div className="stars">
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
          </div>
          <p>{t("testimonials.review3")}</p>
          <div className="profile">
            <img src={assets.profile3} alt="Antonio Carluccio" />
            <div className="profile-data">
              <h3>Antonio Carluccio</h3>
              <span></span>
            </div>
          </div>
        </div>

        <div className="t-box">
          <div className="stars">
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
            <i className="bi-star-fill"></i>
          </div>
          <p>{t("testimonials.review4")}</p>
          <div className="profile">
            <img src={assets.profile4} alt="Mark Herrmann" />
            <div className="profile-data">
              <h3>Mark Herrmann</h3>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="newsletter container" id="newsletter">
        <h2>{t("newsletter.title")}</h2>
        <p>{t("newsletter.subtitle")}</p>
        <form action="">
          <input
            type="email"
            className="email"
            placeholder={t("newsletter.emailPlaceholder")}
            required
          />
          <button type="submit" className="s-btn">
            {t("newsletter.button")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;
