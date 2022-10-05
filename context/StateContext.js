import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();
const StateContext = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);

  const incQty = () => setQty((prevQty) => prevQty + 1);
  const decQty = () =>
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });

  const onAdd = (product, quantity) => {
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    //Check if it's existed in the cart already
    let found = cartItems?.find((item) => item._id === product._id);

    if (!found) {
      //ITEM NOT FOUND THEN ADD IT
      // product.quantity = quantity;
      setCartItems((prevItems) => [...prevItems, {...product,quantity}]);
    } else {
      //FOUND IN CART just add quantity
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(() => {
        console.log("cartItems", updatedCartItems);
        return updatedCartItems;
      });
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    //FIRST check if the item in the cart
    const found = cartItems?.find((item) => item._id === product._id);
    if (!found) return toast.error("No Such item in the cart");

    //SECOND remove its quantity and price from total
    setTotalPrice((prevPrice) => prevPrice - product.quantity * product.price);
    setTotalQuantities((prevQty) => prevQty - product.quantity);

    //THIRD just filter the cartItems
    setCartItems((prev) => prev?.filter((i) => i._id !== product._id));

    //FORTH set the new itemsList
  };

  /**@param indicator == 'inc' or 'dec'**/
  const toggleCartItemQuanitity = (id, indicator) => {
    //find the item index
    let index = cartItems?.findIndex((item) => item._id === id);
    if (index == -1) return toast.error("No such item in the cart");

    if (cartItems[index].quantity <= 1 && indicator == "dec") return;

    //decrease or increase quantity and setCartItems() when you finish
    let change =
      indicator == "inc"
        ? 1
        : indicator == "dec" && cartItems[index].quantity > 1
        ? -1
        : 0;

    //Update totals
    setTotalPrice((prevTotal) => prevTotal + change * cartItems[index].price);
    setTotalQuantities((prevTotal) => prevTotal + change);

    //update cart
    cartItems[index].quantity += change;
    setCartItems(cartItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        setQty,
        toggleCartItemQuanitity,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;

export const useStateContext = () => useContext(Context);
