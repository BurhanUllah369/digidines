import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext"; // Import the context hook
import { useEditRestaurantContext } from "../../context/editRestaurant";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Menu = ({ menuName }) => {
  const { selectedRestaurant } = useRestaurantsPathsContext(); // Access the selected restaurant name from the context

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this menu?",
    );
    if (isConfirmed) {
      alert("Menu deleted!");
    }
  };

  return (
    <section className="rounded bg-white shadow-lg">
      <img
        className="h-40 w-full rounded-t object-cover sm:h-32 md:h-40"
        src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/food-1.jpg"
        alt=""
      />
      <section className="p-3 xs:p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          {menuName}
        </h2>
        <p className="mt-2 text-gray-500">Description</p>
        <section className="mt-4 flex items-center justify-center gap-1 rounded-lg py-2 text-lg sm:gap-3">
          <button>
            <FaArrowLeftLong />
          </button>
          <Link to={`/r/${selectedRestaurant}/edit-menu`}>
            <button className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-1 text-xs text-white xs:text-sm">
              <p>Edit</p>
              <MdEdit className="cursor-pointer" />
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-1 text-xs text-white xs:text-sm"
          >
            <p>Delete</p>
            <MdDelete className="cursor-pointer" />
          </button>
          <button>
            <FaArrowRightLong />
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
        <h1 className="text-xl font-bold sm:text-3xl">Menus</h1>
        <button
          onClick={() => setAddMenu(true)}
          className="flex items-center justify-center gap-1 text-sm font-bold underline sm:text-base"
        >
          <span>Add Menu</span>
          <IoMdAdd />
        </button>
      </section>
      <section className="mb-12 mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Menu menuName="Menu 1" />
        <Menu menuName="Menu 2" />
        <Menu menuName="Menu 3" />
      </section>

      {/* add menu form  */}
      <section
        className={`mx-auto w-full md:w-3/5 ${
          addMenu ? "block" : "hidden"
        } absolute left-1/2 top-0 -translate-x-1/2 rounded-lg bg-white px-4 py-12 shadow-xl sm:p-12`}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Add Menu Category
        </h1>
        <RxCross2
          onClick={() => setAddMenu(false)}
          className="absolute right-2 top-2 cursor-pointer text-xl"
        />
        <form className="flex flex-col gap-4" action="">
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
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
            <input type="file" id="menuImage" accept="image/*" />
          </section>
          <button className="w-full rounded-lg bg-mainColor py-2 text-white">
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};

export default Menus;
