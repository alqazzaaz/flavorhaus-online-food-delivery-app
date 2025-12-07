import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { green } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const PaymentSuccess = () => {
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
              <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />

              <h1 className="py-4 text-2xl fw-bold">
                {t("payment.success")}
              </h1>

              <p className="text-muted mb-2">
                {t("payment.successDesc1")}
              </p>

              <p className="text-muted mb-4">
                {t("payment.successDesc2")}
              </p>

              <Button
                variant="contained"
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

export default PaymentSuccess;