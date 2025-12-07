// src/pages/Moredetails/Moredetails.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Moredetails.css"; // Styles für diese Seite

const Moredetails = () => {
  const navigate = useNavigate();

  return (
    <div className="moredetails-page">
      <button
        className="back-btn"
        onClick={() => navigate("/")}
        aria-label="Zurück zur Startseite"
      >
        ← Zurück
      </button>

      {/* Restlicher Inhalt der Moredetails-Seite */}
      <main className="moredetails-content">
        <h1>Mehr Details</h1>
        <p>Hier kommen die ausführlichen Informationen ...</p>
      </main>
    </div>
  );
};

export default Moredetails;