import React from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useState } from "react";
import "./Home.css";
import Testimonials from "../Testimonials/Testimonials";
import Aboutus from "../Aboutus/Aboutus";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <main className="container">
      <Header />
      <FeaturedFoods />
      <ExploreMenu category={category} setCategory={setCategory} />
      <Testimonials />
      <Aboutus />
    </main>
  );
};

export default Home;
