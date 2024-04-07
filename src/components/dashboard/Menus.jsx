import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEditRestaurantContext } from "../../context/editRestaurant";
import { RxCross2 } from "react-icons/rx";

const Menu = ({ menuName }) => {
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this menu?"
    );
    if (isConfirmed) {
      // Perform delete operation here
      alert("Menu deleted!");
    }
  };

  return (
    <section className="bg-white shadow-lg rounded">
      <img
        className="w-full h-40 sm:h-32 md:h-40 rounded-t object-cover"
        src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/food-1.jpg"
        alt=""
      />
      <section className="p-3 xs:p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          {menuName}
        </h2>
        <p className="mt-2 text-gray-500">Description</p>
        <section className="py-2 flex mt-4 justify-center items-center gap-1 sm:gap-3 rounded-lg text-lg">
          <Link to="/edit-menu" className="">
            <button className="flex items-center gap-2 bg-green-500 rounded-lg py-1 px-3 text-white text-xs xs:text-sm">
              <p>Edit</p>
              <MdEdit className="cursor-pointer" />
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 rounded-lg py-1 px-3 text-white text-xs xs:text-sm"
          >
            <p>Delete</p>
            <MdDelete className="cursor-pointer" />
          </button>
        </section>
      </section>
    </section>
  );
};

const Menus = () => {
  const { showRestaurantSection } = useEditRestaurantContext();
  const [addMenu, setAddMenu] = useState(false);
  return (
    <section
      className={`${showRestaurantSection == 1 ? "block" : "hidden"} relative`}
    >
      <section className="mt-12 flex items-center justify-between">
        <h1 className="text-xl sm:text-3xl font-bold">Menus</h1>
        <button
          onClick={() => setAddMenu(true)}
          className="flex justify-center items-center gap-1 font-bold underline text-sm sm:text-base"
        >
          <span>Add Menu</span>
          <IoMdAdd />
        </button>
      </section>
      <section className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <Menu menuName="Menu 1" />
        <Menu menuName="Menu 1" />
        <Menu menuName="Menu 2" />
      </section>

      {/* add menu form  */}
      <section
        className={`w-full md:w-3/5 mx-auto ${
          addMenu ? "block" : "hidden"
        } absolute top-0 left-1/2 -translate-x-1/2 bg-white px-4 py-12 sm:p-12 rounded-lg shadow-xl`}
      >
        <h1 className="mb-6 text-2xl font-bold text-center">
          Add Menu Category
        </h1>
        <RxCross2
          onClick={() => setAddMenu(false)}
          className="absolute top-2 right-2 text-xl cursor-pointer"
        />
        <form className="flex flex-col gap-4" action="">
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Category name"
          />
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="isVisible">
              Is visible
            </label>
            <input
              className="accent-mainColor"
              type="checkbox"
              id="isVisible"
            />
          </section>
          <section>
            <label className="text-sm" htmlFor="menuImage">
              Select Menu Image
            </label>
            <input type="file" id="menuImage" />
          </section>
          <button className="w-full py-2 bg-mainColor rounded-lg text-white">
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};

export default Menus;
