import React, { useState } from "react";
import { Product } from "../../components";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { client, urlFor } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import getStripe from "../../lib/getStripe";
import toast from "react-hot-toast";
import Image from "next/image";

const ProductDetails = ({ product, products }) => {
  const { image, price, slug, name, details, discounted } = product;
  const { onAdd, incQty, decQty, qty, setQty } = useStateContext();
  const [index, setIndex] = useState(0);

  //Manage Rating stars
  const stars = [];
  const formStars = () => {
    if (product.rate) {
      for (let i = 0; i < Math.floor(product.rate); i++) {
        stars.push(<BsStarFill key={"f" + i} />);
      }
      if (product.rate != Number.parseInt(product.rate))
        stars.push(<BsStarHalf key={"h"} />);

      for (let i = Math.ceil(product.rate); i < 5; i++) {
        stars.push(<BsStar key={"o" + i} />);
      }
    } else
      stars.push(
        ...[
          <BsStar key={"o1"} />,
          <BsStar key={"o2"} />,
          <BsStar key={"o3"} />,
          <BsStar key={"o4"} />,
          <BsStar key={"o5"} />,
        ]
      );
  };
  formStars();
  
  const handleBuyNow = async ()=>{
    const stripe = await getStripe()
    
    toast.loading('Redirecting...')
    const res = await fetch('/api/stripe',{
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify([{...product, quantity: qty}])
    })

    if(res.status !== 200) return toast.error("Something went wrong")
    const data = await res.json()

    localStorage.setItem('checkoutState', 'individual')

    stripe.redirectToCheckout({sessionId: data.id})
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
            alt="product-detail-image"
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
              alt="small-image"
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>{stars}</div>
            <p>({product.reviews ?? 0})</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <span>
            <span
              className="price"
              style={
                discounted && {
                  textDecoration: "line-through",
                  fontSize: "1.2rem",
                  color: "grey",
                }
              }
            >
              {price} AED
            </span>
            {discounted && (
              <span className="price" style={{ marginInlineStart: 8 }}>
                {discounted} AED
              </span>
            )}
          </span>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty.bind(this)}>
                <AiOutlineMinus color="grey" />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty.bind(this)}>
                <AiOutlinePlus color="grey" />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                onAdd(product, qty);
                setQty(1);
              }}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow.bind(this)}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  //Here we only getting slug not the whole product MORE LIKE A GraphQL query
  //NOTICE: Down below we was asking for the whole product WHICH HAS slug == ${slug}
  const query = `*[_type == "product"] {slug {current}}`;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  let productQ = `*[_type == "product" && slug.current == '${slug}'][0]`;
  let product = await client.fetch(productQ);
  console.log("prod", product);

  let productsQ = `*[_type == "product"]`;
  let products = await client.fetch(productsQ);

  return {
    props: {
      product,
      products,
    },
  };
};
