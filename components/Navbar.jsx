import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, totalQuantities, setShowCart } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <span>
            <span style={{ color: "black", fontSize: "1.8rem" }}>NEXTECH</span>{" "}
            Electronics
          </span>
        </Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        {totalQuantities !== 0 &&
        <span className="cart-item-qty">{totalQuantities}</span>}
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
