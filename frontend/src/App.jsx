import React from "react";
import Menubar from "./components/Menubar/Menubar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import ExploreFood from "./pages/ExploreFood/ExploreFood";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure/PaymentFailure";
import MyOrders from "./pages/MyOrders/MyOrders";
import Moredetails from "./pages/Moredetails/Moredetails";
import { useTranslation } from "react-i18next";

const App = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;


  // Routen, auf denen die Menubar NICHT angezeigt werden soll
  const hideNavbarOn = ["/Moredetails"]; // ggf. weitere Pfade hinzufügen

  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Menubar />}

      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment/success/:orderId" element={<PaymentSuccess />} />
        <Route path="/payment/fail/:orderId" element={<PaymentFailure />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/moredetails" element={<Moredetails />} />
      </Routes>
    </div>
  );
};

export default App;
