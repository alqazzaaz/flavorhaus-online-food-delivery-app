import React, { useEffect } from "react";
import "./Aboutus.css";
import { assets } from "../../assets/assets";
import ScrollReveal from "scrollreveal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Aboutus = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1800,
      delay: 400,
    });

    sr.reveal(".footer .social", {
      origin: "left",
    });
    sr.reveal(".footer-text", {
      origin: "right",
      interval: 200,
    });
    sr.reveal(".copyright", {
      origin: "bottom",
      interval: 200,
    });
  }, []);

  return (
    <div className="footer">
      <div className="footer-content container">
        <div className="footer-box">
          <a href="#" className="footer-logo" aria-hidden="true"></a>

          <div className="social">
            <p>{t("footer.developedBy")}</p>

            <h3>{t("people.abdullah.name")}</h3>
            <h5>{t("people.abdullah.role")}</h5>
            <h5>{t("people.abdullah.email")}</h5>
            <a
              href="https://github.com/alqazzaaz"
              aria-label={t("people.abdullah.githubLabel")}
            >
              <i className="bi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/abdullah-al-qazzaz-93b316367/"
              aria-label={t("people.abdullah.linkedinLabel")}
            >
              <i className="bi-linkedin"></i>
            </a>
            <a
              href="https://wa.me/491636395838?text=Hallo%20Abdullah%2C%20ich%20bin%20auf%20deine%20Website%20gesto%C3%9Fen%20und%20wollte%20dich%20kontaktieren"
              aria-label={t("people.abdullah.whatsappLabel")}
            >
              <i className="bi-whatsapp"></i>
            </a>

            <h3>{t("people.mohammad.name")}</h3>
            <h5>{t("people.mohammad.role")}</h5>
            <h5>{t("people.mohammad.email")}</h5>
            <a
              href="https://github.com/Mohammad-El-Zein"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("people.mohammad.githubLabel")}
            >
              <i className="bi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-el-zein-501b01339/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("people.mohammad.linkedinLabel")}
            >
              <i className="bi-linkedin"></i>
            </a>
            <a
              href="https://wa.me/491745358458?text=Hallo%20Mohammad%2C%20ich%20bin%20auf%20deine%20Website%20gesto%C3%9Fen%20und%20wollte%20dich%20kontaktieren"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("people.mohammad.whatsappLabel")}
            >
              <i className="bi-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-text">
          <p>{t("footer.aboutTitle")}</p>
          <i>{t("footer.aboutText")}</i>
          
        </div>
      </div>

      <p className="copyright">{t("footer.copyright")}</p>
    </div>
  );
};
export default Aboutus;
