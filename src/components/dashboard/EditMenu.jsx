import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const MenuItem = ({ itemName, price }) => {
  const handleDelProduct = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      // Perform delete operation here
      alert("Item deleted!");
    }
  }
  return (
    <section className="bg-white shadow-lg rounded">
      <img
        className=" h-40 sm:h-32 md:h-40 rounded-t object-cover"
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
          <Link to="/edit-product">
          <button className="flex items-center gap-2 bg-green-500 rounded-lg py-1 px-3 text-white text-xs xs:text-sm">
            <p>Edit</p>
            <MdEdit className="cursor-pointer" />
          </button></Link>
          <button onClick={handleDelProduct} className="flex items-center gap-2 bg-red-600 rounded-lg py-1 px-3 text-white text-xs xs:text-sm">
            <p>Delete</p>
            <MdDelete className="cursor-pointer" />
          </button>
          <button className="flex items-center gap-2 bg-mainColor rounded-lg py-1 px-3 text-white text-xs xs:text-sm">
            <p>Details</p>
            <IoListSharp className="cursor-pointer" />
          </button>
        </section>
      </section>
    </section>
  );
};

const EditMenu = () => {
  return (
    <section className="w-11/12 sm:w-5/6 lg:w-3/4 mx-auto my-12">
      <section className="flex items-center">
        <Link to="/r" className="flex items-center gap-2 text-sm">
          <FaArrowLeftLong className="cursor-pointer" />
          <span>Back</span>
        </Link>
        <h1 className="mx-auto text-3xl font-bold">Menu Items</h1>
      </section>

      <section className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        <MenuItem price={20} itemName="Pizza" />
        <MenuItem price={20} itemName="Sandwiches" />
        <MenuItem price={20} itemName="Fries" />
        <MenuItem price={20} itemName="Burger" />
      </section>
      <button className="mx-auto mt-12 flex justify-center items-center gap-2 bg-green-500 py-2 px-4 rounded-lg text-sm xs:text-base text-white">
        <IoMdAdd />
        <span>Add Menu Item</span>
      </button>
    </section>
  );
};

export default EditMenu;
