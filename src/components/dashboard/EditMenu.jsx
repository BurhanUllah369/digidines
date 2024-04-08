import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";

const MenuItem = ({ itemName, price, selectedRestaurant }) => {
  const handleDelProduct = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      alert("Item deleted!");
    }
  };

  return (
    <section className="bg-white shadow-lg rounded">
      <img
        className="w-full h-40 rounded-t object-cover"
        src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/food-1.jpg"
        alt=""
      />
      <section className="p-3 xs:p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          <span>{itemName}</span>
          <span className="p-2 text-base bg-mainColor rounded-lg text-white">
            ${price}
          </span>
        </h2>
        <p className="mt-2 text-gray-500">Description</p>
        <section className="py-2 flex mt-4 justify-center items-center gap-1 sm:gap-3 rounded-lg text-lg">
          <Link
            to={`/r/${selectedRestaurant}/edit-menu/edit-product`}
          >
            <button className="flex items-center gap-1 xs:gap-2 bg-green-500 rounded-lg py-1 px-3 text-white text-xs xs:text-sm">
              <p>Edit</p>
              <MdEdit className="cursor-pointer" />
            </button>
          </Link>
          <button
            onClick={handleDelProduct}
            className="flex items-center gap-1 xs:gap-2 bg-red-600 rounded-lg py-1 px-3 text-white text-xs xs:text-sm"
          >
            <p>Delete</p>
            <MdDelete className="cursor-pointer" />
          </button>
          <button className="flex items-center gap-1 xs:gap-2 bg-mainColor rounded-lg py-1 px-3 text-white text-xs xs:text-sm">
            <p>Details</p>
            <IoListSharp className="cursor-pointer" />
          </button>
        </section>
      </section>
    </section>
  );
};

const EditMenu = () => {
  const { selectedRestaurant } = useRestaurantsPathsContext();

  return (
    <section className="w-11/12 sm:w-5/6 lg:w-3/4 mx-auto my-12">
      <Link
        to={`/r/${selectedRestaurant}`}
        className="mb-6 flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <span>Back</span>
      </Link>
      <section className="flex items-center justify-between">
        <h1 className="text-xl xs:text-3xl font-bold">Menu Items</h1>
        <Link to={`/r/${selectedRestaurant}/edit-menu/edit-product`}>
          <button className="flex justify-center items-center gap-2 text-sm xs:text-base underline">
            <IoMdAdd />
            <span>Add Menu Item</span>
          </button>
        </Link>
      </section>

      <section className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <MenuItem
          price={20}
          itemName="Pizza"
          selectedRestaurant={selectedRestaurant}
        />
        <MenuItem
          price={20}
          itemName="Sandwiches"
          selectedRestaurant={selectedRestaurant}
        />
        <MenuItem
          price={20}
          itemName="Fries"
          selectedRestaurant={selectedRestaurant}
        />
        <MenuItem
          price={20}
          itemName="Burger"
          selectedRestaurant={selectedRestaurant}
        />
      </section>
    </section>
  );
};

export default EditMenu;
