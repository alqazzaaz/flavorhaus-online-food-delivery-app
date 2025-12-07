import React, {
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ScrollReveal from "scrollreveal";
import "./FeaturedFoods.css";
import { useTranslation } from "react-i18next";

const FeaturedFoods = () => {
  const { foodList, increaseQty, decreaseQty, quantities } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const translateCategory = (cat) => {
  return t(`categoryMap.${cat}`, cat);
};


  const featured = [...foodList, ...foodList].slice(0, 6);

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  let restartTimer = null;

  const pauseAutoplay = () => {
    if (!swiperRef.current) return;
    swiperRef.current.autoplay.stop();

    clearTimeout(restartTimer);
    restartTimer = setTimeout(() => {
      swiperRef.current.autoplay.start();
    }, 3000);
  };

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1800,
      delay: 400,
    });

    sr.reveal(".container .d-flex", { origin: "left" });
    sr.reveal(".container .swiper", { origin: "bottom" });
  }, []);

  return (
    <section className="container">
      <div className="d-flex align-items-center mb-3">
        <h2 className="fw">{t("featured.title")}</h2>

        <div className="slider-nav">
          <button
            ref={prevRef}
            onClick={pauseAutoplay}
            className="nav-btn nav-left"
          >
            ❮
          </button>
          <button
            ref={nextRef}
            onClick={pauseAutoplay}
            className="nav-btn nav-right"
          >
            ❯
          </button>
        </div>
      </div>

      <Swiper
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={1.4}
        loop={true}
        speed={600}
        breakpoints={{
          1200: { slidesPerView: 2 },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: -20,
          depth: 250,
          modifier: 2,
          slideShadows: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="featured-swiper"
      >
        {featured.map((food, i) => {
          const name = food.name?.[lang] || "";
          const desc = food.description?.[lang] || "";

          return (
            <SwiperSlide
              key={food.id + "-" + i}
              className={`featured-slide ${
                activeIndex === i ? "active-slide" : "blurred-slide"
              }`}
            >
              <div className="featured-card p-4">
                <img
                  src={food.imageUrl}
                  alt={name}
                  className="featured-img"
                  onClick={() => {
                    navigate(`/food/${food.id}`);
                    pauseAutoplay();
                  }}
                />

                <h4
                  className="fw-bold mt-3 clickable-title"
                  onClick={() => {
                    navigate(`/food/${food.id}`);
                    pauseAutoplay();
                  }}
                >
                  {name}
                </h4>

                <span className="badge text-bg-warning mb-2">
                  {translateCategory(food.category)}
                </span>

                <p className="small text-muted">{desc}</p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fs-5 fw-bold">
                    {food.price}.00 {t("card.priceSuffix")}
                  </span>

                  {quantities[food.id] > 0 ? (
                    <div className="d-flex gap-2 align-items-center">
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => {
                          decreaseQty(food.id);
                          pauseAutoplay();
                        }}
                      >
                        {t("card.quantityMinus")}
                      </button>

                      <span className="fw-bold">
                        {quantities[food.id]}
                      </span>

                      <button
                        className="btn btn-outline-dark"
                        onClick={() => {
                          increaseQty(food.id);
                          pauseAutoplay();
                        }}
                      >
                        {t("card.quantityPlus")}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        increaseQty(food.id);
                        pauseAutoplay();
                      }}
                    >
                      {t("card.addToCart")}
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="text-center mt-4">
        <button
          className="btn btn-outline-dark btn-lg"
          onClick={() =>
            navigate("/explore", { state: { category: "All" } })
          }
        >
          {t("featured.seeAll")}
        </button>
      </div>
    </section>
  );
};

export default FeaturedFoods;
