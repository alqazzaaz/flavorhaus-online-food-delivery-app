import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assets } from "../../assets/assets";
import './Header.css';
import ScrollReveal from 'scrollreveal';
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 1700,
      delay: 400,
    });

    sr.reveal('.header-text', { origin: 'left' });
    sr.reveal('.header-image', { origin: 'right' });
    sr.reveal('.my-feature', { origin: 'bottom', interval: 150 });

  }, []);

  return (
    <div className='Headerr'>
      <div className="home-header">
        <div className="container content-header">

          {/* TEXT LEFT */}
          <div className="header-text">
            <h1 className='f'>{t("header.title")}</h1>

            <p className='a'>
              {t("header.subtitle")}
            </p>

            <h3>{t("header.qualityLine")}</h3>

            <Link to="/explore" className='btn'>
              {t("header.orderNow")}
            </Link>
          </div>

          {/* IMAGE RIGHT */}
          <div className="header-image">
            <img src={assets.homee} alt="Home" className="home-img" />
          </div>
        </div>

        <img src={assets.homemask} alt="Mask" className="homemask-img" />
      </div>

      {/* FEATURES SECTION */}
      <div className="feature container my-feature">

        <div className="feature-box">
          <img src={assets.feature1} alt="" className="feature-img" />
          <div className='feature-text'>
            <h4>{t("header.feature1Title")}</h4>
            <p>{t("header.feature1Desc")}</p>
          </div>
        </div>

        <div className="feature-box">
          <img src={assets.feature2} alt="" className="feature-img" />
          <div className='feature-text'>
            <h4>{t("header.feature2Title")}</h4>
            <p>{t("header.feature2Desc")}</p>
          </div>
        </div>

        <div className="feature-box">
          <img src={assets.feature3} alt="" className="feature-img" />
          <div className='feature-text'>
            <h4>{t("header.feature3Title")}</h4>
            <p>{t("header.feature3Desc")}</p>
          </div>
        </div>

        <div className="feature-box">
          <img src={assets.feature4} alt="" className="feature-img" />
          <div className='feature-text'>
            <h4>{t("header.feature4Title")}</h4>
            <p>{t("header.feature4Desc")}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;