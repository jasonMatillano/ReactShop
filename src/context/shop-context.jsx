// Importing necessary React hooks and the PRODUCTS data
import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";

// Creating a context called ShopContext, initially set to null
export const ShopContext = createContext(null);

// Function to generate the default cart object
// It creates a cart with each product ID as the key and sets the quantity to 0 initially
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;  // Each item starts with a quantity of 0
  }
  return cart;
};

// ShopContextProvider component provides context to the entire application
export const ShopContextProvider = (props) => {
  // State to store the cart items, initialized with the default cart structure
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Function to calculate the total amount of items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // Loop through each item in the cart
    for (const item in cartItems) {
      // Only count items with quantities greater than 0
      if (cartItems[item] > 0) {
        // Find the product information using the product ID
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        // Add to the total amount by multiplying item quantity by its price
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  // Function to add a product to the cart
  const addToCart = (itemId) => {
    // Update the state to increase the quantity of the specified item by 1
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  // Function to remove a product from the cart
  const removeFromCart = (itemId) => {
    // Update the state to decrease the quantity of the specified item by 1
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // Function to update the quantity of a specific item in the cart
  const updateCartItemCount = (newAmount, itemId) => {
    // Update the cart with the new amount for the specified item
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  // Function to reset the cart (used during checkout)
  const checkout = () => {
    // Reset the cart to its default state (all quantities set to 0)
    setCartItems(getDefaultCart());
  };

  // Context value object that contains all cart-related functionality and state
  const contextValue = {
    cartItems,               // Current cart items
    addToCart,               // Function to add an item to the cart
    updateCartItemCount,     // Function to update item quantity
    removeFromCart,          // Function to remove an item from the cart
    getTotalCartAmount,      // Function to get the total cart amount
    checkout,                // Function to clear the cart at checkout
  };

  // Providing the context value to any children components within ShopContext
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}  {/* Render any children components inside the provider */}
    </ShopContext.Provider>
  );
};
