import Link from "next/link";
import React from "react";

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>HEADING H3</h3>
        <img alt="banner-img" src="" />
        <div>
          <Link href="/product/ID">
            <button type="button">BUTTON TEXT</button>
          </Link>
          <div className="desc">
            <h5>DESC</h5>
            <p>HERE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
