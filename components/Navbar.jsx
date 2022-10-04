import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './';

const Navbar = () => {

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">NEXTECH Electronics</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>

      {/* {showCart && <Cart />} */}
    </div>
  )
}

export default Navbar