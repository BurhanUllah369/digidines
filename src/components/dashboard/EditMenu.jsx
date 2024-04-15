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
      "Are you sure you want to delete this item?",
    );
    if (isConfirmed) {
      alert("Item deleted!");
    }
  };

  return (
    <section className="rounded bg-white shadow-lg">
      <img
        className="h-40 w-full rounded-t object-cover"
        src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/food-1.jpg"
        alt=""
      />
      <section className="p-3 xs:p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          <span>{itemName}</span>
          <span className="rounded-lg bg-mainColor p-2 text-base text-white">
            ${price}
          </span>
        </h2>
        <p className="mt-2 text-gray-500">Description</p>
        <section className="mt-4 flex items-center justify-center gap-1 rounded-lg py-2 text-lg sm:gap-3">
          <Link to={`/r/${selectedRestaurant}/edit-menu/edit-product`}>
            <button className="flex items-center gap-1 rounded-lg bg-green-500 px-3 py-1 text-xs text-white xs:gap-2 xs:text-sm">
              <p>Edit</p>
              <MdEdit className="cursor-pointer" />
            </button>
          </Link>
          <button
            onClick={handleDelProduct}
            className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-xs text-white xs:gap-2 xs:text-sm"
          >
            <p>Delete</p>
            <MdDelete className="cursor-pointer" />
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-mainColor px-3 py-1 text-xs text-white xs:gap-2 xs:text-sm">
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
    <section className="mx-auto my-12 w-11/12 sm:w-5/6 lg:w-3/4">
      <Link
        to={`/r/${selectedRestaurant}`}
        className="mb-6 flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <span>Back</span>
      </Link>
      <section className="flex items-center justify-between">
        <h1 className="text-xl font-bold xs:text-3xl">Menu Items</h1>
        <Link to={`/r/${selectedRestaurant}/edit-menu/edit-product`}>
          <button className="flex items-center justify-center gap-2 text-sm underline xs:text-base">
            <IoMdAdd />
            <span>Add Menu Item</span>
          </button>
        </Link>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
