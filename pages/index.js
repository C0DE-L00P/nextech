import React from "react";
import { Footer, FooterBan, HeroBanner, Product } from "../components";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker there are many variations passages</p>
      </div>
      <div className="products-container">
        {["product1", "product2"].map((product) => product)}
      </div>
      <FooterBan />
    </>
  );
};

export default Home;
