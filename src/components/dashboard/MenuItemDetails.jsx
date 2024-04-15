import React, { useState } from "react";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useProductDetailsContext } from "../../context/productDetailsContext";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useCartContext } from "../../context/cartContext";
import { IoIosCheckmarkCircle } from "react-icons/io";

const formatProductName = (name) => {
  // Replace hyphens with spaces and capitalize each word
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const MenuItemDetails = () => {
  const { selectedProduct } = useProductDetailsContext();
  const { selectedRestaurant } = useRestaurantsPathsContext();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Medium");
  const [addons, setAddons] = useState([]);
  const basePrice = 20; // Base price of the product
  const [totalPrice, setTotalPrice] = useState(basePrice); // Total price
  const [productAdded, setProductAdded] = useState(false);

  const handleAddToCart = () => {
    const newItem = {
      name: selectedProduct,
      quantity: quantity,
      size: size,
      addons: addons,
      totalPrice: totalPrice,
    };
    setProductAdded(true)
    setTimeout(() => {
      setProductAdded(false)
    }, 1000);

    addToCart(newItem);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, value); 
    setQuantity(newQuantity);
    setTotalPrice(basePrice * newQuantity);
  };

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
  };

  const handleAddonToggle = (addon) => {
    if (addons.includes(addon)) {
      setAddons(addons.filter((item) => item !== addon)); // Remove addon if already selected
    } else {
      setAddons([...addons, addon]); // Add addon if not selected
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto w-11/12 sm:w-3/4">
        <div className="mb-8 flex justify-between items-center">
          <Link to={`/menus/${selectedRestaurant}/`}>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
              <FaArrowLeftLong />
              <span>Back</span>
            </button>
          </Link>
          <Link
          to={`/menus/${selectedRestaurant}/cart`}
          className="flex items-center gap-2 font-bold"
        >
          <span>Cart</span>
          <FaShoppingCart />
        </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <img
              src="https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg"
              alt="Product"
              className="h-auto w-full rounded-lg"
            />
          </div>
          <div>
            <h1 className="mb-4 text-xl font-bold xs:text-3xl">
              {formatProductName(selectedProduct.name)}
            </h1>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-bold text-gray-700 "
              >
                Quantity
              </label>
              <div className="flex w-32 items-center justify-between">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaMinus />
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="w-full flex-1 appearance-none rounded bg-gray-100 px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-sm font-bold text-gray-700"
              >
                Size
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => handleSizeChange(e.target.value)}
                className="block w-full rounded bg-gray-100 p-2 outline-none"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <div className="mb-4">
              <p className="block text-sm font-bold text-gray-700">Addons</p>
              <div>
                <label className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="checkbox"
                    onChange={() => handleAddonToggle("Extra Cheese")}
                    checked={addons.includes("Extra Cheese")}
                    className="accent-mainColor"
                  />
                  <span>Extra Cheese</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="checkbox"
                    onChange={() => handleAddonToggle("Olives")}
                    checked={addons.includes("Olives")}
                    className="accent-mainColor"
                  />
                  <span>Olives</span>
                </label>
                {/* Add more addons as needed */}
              </div>
            </div>
            <div>
              <p className="font-bold">Special Request</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="3"
                className="my-3 rounded-lg border p-3 outline-none"
              ></textarea>
            </div>
            <div className="mb-4">
              <p className="block font-bold text-gray-700">
                Price: ${totalPrice}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`inline-flex items-center space-x-2 rounded ${productAdded ? "bg-green-500" : "bg-blue-500"} px-4 py-2 font-bold text-white `}
            >
              {productAdded ? <IoIosCheckmarkCircle /> : null}
              <span>{productAdded ? "Added To Cart" : "Add to Cart"}</span>
            </button>
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-bold">Description</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat amet
          repellendus nihil inventore exercitationem corporis praesentium
          tempore voluptate delectus! Rem, voluptatum. Reiciendis iusto harum
          numquam aliquam, temporibus in magnam illum.
        </p>
      </div>
    </div>
  );
};

export default MenuItemDetails;
