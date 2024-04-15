import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEditRestaurantContext } from "../../context/editRestaurant";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";

const AddOn = ({ selectedRestaurant }) => {
  const handlDelClick = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this coupon?",
    );
    if (confirm) alert("Addon Deleted!");
  };

  return (
    <section className="flex flex-col gap-4 rounded-lg border px-6 py-4 shadow-lg">
      <h2 className="text-center text-xl font-bold">Addon 1</h2>
      <p className="flex items-center justify-between">
        <span className="text-sm">Type:</span>{" "}
        <span className="font-bold">Multiple</span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-sm">Extra Sauce</span>
        <span className="font-bold">$20.00</span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-sm">Pepperoni</span>
        <span className="font-bold">$30.00</span>
      </p>
      <section className="mt-3 flex items-center justify-center gap-4 text-sm">
        <Link to={`/r/${selectedRestaurant}/edit-addon`}>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-3 py-1 text-white">
            <span>Edit</span>
            <MdEdit className="" />
          </button>
        </Link>
        <button
          onClick={handlDelClick}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-1 text-white"
        >
          <span>Delete</span>
          <MdDelete className="" />
        </button>
      </section>
    </section>
  );
};

const AddOns = () => {
  const { showRestaurantSection } = useEditRestaurantContext();
  const { selectedRestaurant } = useRestaurantsPathsContext();

  return (
    <section
      className={`${showRestaurantSection == 2 ? "block" : "hidden"} mb-12`}
    >
      <section className="mt-12 flex items-center justify-between">
        <h1 className="text-xl font-bold sm:text-3xl">Add-Ons</h1>
        <Link to={`/r/${selectedRestaurant}/edit-addon`}>
          <button className="flex items-center justify-center gap-1 text-sm font-bold underline sm:text-base">
            <span>Add AddOn</span>
            <IoMdAdd />
          </button>
        </Link>
      </section>
      <section className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <AddOn selectedRestaurant={selectedRestaurant} />
        <AddOn selectedRestaurant={selectedRestaurant} />
        <AddOn selectedRestaurant={selectedRestaurant} />
        <AddOn selectedRestaurant={selectedRestaurant} />
      </section>
    </section>
  );
};

export default AddOns;
