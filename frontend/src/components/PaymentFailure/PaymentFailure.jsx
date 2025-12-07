import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <Card
              className="p-5 shadow-sm bg-white text-center"
              style={{ borderRadius: "12px" }}
            >
              <HighlightOffIcon sx={{ fontSize: "5rem", color: red[500] }} />

              <h1 className="py-4 text-2xl fw-bold">
                {t("payment.fail")}
              </h1>

              <p className="text-muted mb-2">{t("payment.failDesc1")}</p>
              <p className="text-muted mb-4">{t("payment.failDesc2")}</p>

              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/")}
                className="w-100 py-2"
              >
                {t("payment.backHome")}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentFailure;