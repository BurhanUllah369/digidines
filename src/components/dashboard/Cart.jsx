import React, { useState } from "react";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useCartContext } from "../../context/cartContext";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div
      key={item.id}
      className="flex items-center justify-between rounded-lg border p-4"
    >
      <div className="mb-2 flex items-center">
        <img src={item.name.imageUrl} className="mr-4 w-24" />
        <div>
          <h2 className="text-lg font-bold">{item.name.name}</h2>
          <p className="text-gray-600 font-bold">${item.name.price}</p>
        </div>
      </div>
      <div className="mb-2 flex items-center">
        <label className="mr-2 font-bold">Quantity:</label>
        <input
          type="number"
          id={`quantity-${item.id}`}
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-20 rounded border p-1 outline-none"
        />
      </div>
      <p className="mb-2 text-gray-600">
        <span className="font-bold">Variation:</span> {item.size}
      </p>
      <button
        onClick={() => removeFromCart(item.name.name)}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

const Cart = () => {
  const { selectedRestaurant } = useRestaurantsPathsContext();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCartContext();
  const totalPrice = getTotalPrice();

  return (
    <div className="mx-auto w-11/12 py-8 lg:w-3/4">
      <Link
        to={`/menus/${selectedRestaurant}`}
        className="mb-4 flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <span>Back</span>
      </Link>
      <h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to={`/menus/${selectedRestaurant}`}>
            <button className="mt-4 rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
              Go Back
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-full overflow-x-scroll md:overflow-hidden">
          <div className="w-[900px] space-y-4 md:w-auto">
            {cartItems.map((item, idx) => (
              <CartItem
                key={idx}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
        </div>
      )}
      <div className="float-right mt-8">
        <h2 className="mb-2 text-xl font-bold">Total Price: $300{totalPrice}</h2>
        <button className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
