import React from "react";
import { FooterBan, HeroBanner, Product } from "../components";
import { client } from "../lib/client";

const Home = ({products, banners}) => {
  return (
    <>
      <HeroBanner bannerData={banners.length && banners[0]}/>
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker there are many variations passages</p>
      </div>
      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
      <FooterBan footerBanner={banners[0]}/>
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);
  console.log(banners)

  return {
    props: {products, banners}
  }
}

export default Home;