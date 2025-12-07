import React, { useEffect } from "react";
import "./Contact.css";
import ScrollReveal from "scrollreveal";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1800,
      delay: 300,
    });

    sr.reveal(".container", {
      origin: "left",
    });

    sr.reveal("h2", {
      origin: "top",
    });

    sr.reveal(".contact-signature p", {
      origin: "bottom",
    });
  }, []);

  return (
    <section className="contact-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form-wrapper">
              <h2 className="text-center mb-4 contact-title">
                {t("contactPage.formTitle")}
              </h2>

              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder={t("contactPage.firstNamePlaceholder")}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder={t("contactPage.lastNamePlaceholder")}
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control custom-input"
                      placeholder={t("contactPage.emailPlaceholder")}
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control custom-input"
                      rows="5"
                      placeholder={t("contactPage.messagePlaceholder")}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button className="contact-btn w-100 py-3" type="submit">
                      {t("contactPage.sendMessage")}
                    </button>
                  </div>
                </div>
              </form>

              <div className="contact-signature text-center mt-4">
                <p className="signature-text">
                  {t("footer.developedBy")}{" "}
                  <strong>Abdullah Al-Qazzaz</strong> &{" "}
                  <strong>Mohammad El-Zein</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;