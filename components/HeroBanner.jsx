import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const HeroBanner = ({
  bannerData: {
    image,
    buttonText,
    product,
    desc,
    smallText,
    midText,
    slug,
    largeText1,
    largeText2,
    discount,
    saleTime,
  },
}) => {
  console.log(slug)
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img alt="banner-img" src={urlFor(image)} className="hero-banner-image"/>
        <div>
          <Link href={`/product/${slug.current}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
