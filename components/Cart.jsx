import React, { useRef, useState, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import useStripe from '../lib/useStripe'

const Cart = () => {
  const [animate, setAnimate] = useState(false);
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    showCart,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  useEffect(() => {
    setTimeout(() => {
      setAnimate(showCart);
    }, 100);
  }, [showCart]);
  
  const handleCheckout = async () => {
    toast.loading('Redirecting... ')
    const stripe = await useStripe()
    const request = await fetch('/api/stripe',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems)
    })

    if(request.status !== 200) return toast.error(request.statusText)
    const data = await request.json()

    stripe.redirectToCheckout({sessionId: data.id})
  }

  const TRANSITION_DELAY = 0.2,
    TRANSITION_DURATION = 0.5;

  return (
    <div
      className="cart-wrapper"
      ref={cartRef}
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          setAnimate(false);
          setTimeout(() => setShowCart(false), TRANSITION_DURATION * 1000);
        }
      }}
    >
      <div
        className="cart-container"
        style={{
          transform: animate ? "translateX(0px)" : "translateX(600px)",
          transitionDuration: `${TRANSITION_DURATION}s`,
        }}
      >
        <button
          type="button"
          className="cart-heading"
          onClick={() => {
            setAnimate(false);
            setTimeout(() => setShowCart(false), TRANSITION_DURATION * 1000);
          }}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems?.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} color="#5c5c5c" />
            <h3>Your shopping bag is empty</h3>
            <button
              type="button"
              onClick={() => {
                setAnimate(false);
                setTimeout(
                  () => setShowCart(false),
                  TRANSITION_DURATION * 1000
                );
              }}
              className="btn"
            >
              Continue Shopping
            </button>
          </div>
        )}

        <div className="product-container">
          {cartItems?.length >= 1 &&
            cartItems?.map((item, index) => (
              <div
                className="product"
                key={item?._id}
                style={{
                  transform: animate ? "translateX(0px)" : "translateX(140px)",
                  opacity: animate ? 1 : 0,
                  transitionDuration: `0.9s`,
                  transitionDelay: `${TRANSITION_DELAY + index * 0.1}s`,
                }}
              >
                {item && (
                  <img
                    src={urlFor(item?.image[0])}
                    className="cart-product-image"
                  />
                )}
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>{item?.price} AED</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item?._id, "dec")
                          }
                        >
                          <AiOutlineMinus color="grey" />
                        </span>
                        <span className="num">{item?.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item?._id, "inc")
                          }
                        >
                          <AiOutlinePlus color="grey" />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{totalPrice} AED</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
