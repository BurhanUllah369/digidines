import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import { IoFastFood } from "react-icons/io5";

const Restaurant = ({ name }) => {
  const { setSelectedRestaurantName } = useRestaurantsPathsContext();

  const formatRestaurantNameForUrl = (name) => {
    return name.trim().replace(/\s+/g, "-").toLowerCase();
  };

  const handleRestaurantClick = () => {
    setSelectedRestaurantName(name);
  };

  return (
    <section className="rounded bg-white shadow-lg">
      <img
        className="w-full rounded-t"
        src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/food-1.jpg"
        alt=""
      />
      <section className="p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          <span>{name}</span>
        </h2>
        <p className="mt-2 text-gray-500">
          digidines.com/r/{formatRestaurantNameForUrl(name)}
        </p>
        <section className="mt-4 flex justify-center gap-4">
          <Link
            onClick={handleRestaurantClick}
            to={`/menus/${formatRestaurantNameForUrl(name)}`}
          >
            <button className="flex w-full items-center  gap-2 rounded bg-mainColor px-4 py-2 text-sm text-white">
              <IoFastFood className="text-lg" />
              <span>Menu</span>
            </button>
          </Link>
          <Link
            onClick={handleRestaurantClick}
            to={`/r/${formatRestaurantNameForUrl(name)}`}
          >
            <button className="flex w-full items-center gap-2 rounded bg-green-500 px-4 py-2 text-sm text-white">
              <MdModeEditOutline className="text-lg" />
              <span>Edit</span>
            </button>
          </Link>
        </section>
      </section>
    </section>
  );
};

const Restaurants = () => {
  const [addRestaurant, setAddRestaurant] = useState(false);
  const [url, setUrl] = useState("");

  return (
    <div className="">
      <section
        className={`${
          addRestaurant ? "opacity-5" : "opacity-100"
        } ml-auto w-full  p-4 sm:p-12`}
      >
        <section className="flex flex-col justify-between gap-2 xs:flex-row xs:items-center xs:gap-0">
          <h1 className="text-2xl font-bold xs:text-3xl sm:text-4xl">
            Restaurants
          </h1>
          <button
            onClick={() => setAddRestaurant(true)}
            className="flex items-center gap-2 text-sm underline sm:text-lg"
          >
            <span className="font-bold">Add Restaurants</span>
            <MdEdit className="" />
          </button>
        </section>
        <section className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          <Restaurant name="Cheezious" />
          <Restaurant name="Pizza-hut" />
          <Restaurant name="Food-panda" />
          <Restaurant name="Spicy-grill" />
          <Restaurant name="Chinese" />
          <Restaurant name="Italian" />
        </section>
      </section>

      {/* add Restaurant  */}

      <section
        className={`mx-auto w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/3 ${
          addRestaurant ? "block" : "hidden"
        } absolute left-1/2 top-24 -translate-x-1/2 rounded-lg bg-white px-4 py-12 shadow-xl sm:p-12`}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">Add Restaurant</h1>
        <RxCross2
          onClick={() => setAddRestaurant(false)}
          className="absolute right-2 top-2 cursor-pointer text-xl"
        />
        <form className="flex flex-col gap-3" action="">
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Restaurant Name"
            onChange={(e) => {
              const value = e.target.value.trim().replace(/\s+/g, "-");
              setUrl(value);
            }}
          />
          <section>
            <p className="mb-2 mt-2 font-bold">Short name in URL</p>
            <p className="rounded-lg border px-3 py-2 font-bold text-gray-500">
              digidines.com/r/{url}
            </p>
          </section>
          <p className="font-bold">Currency</p>
          <select
            name=""
            id=""
            className="rounded-lg border px-3 py-2 outline-none"
          >
            <option value="">US Dollar</option>
            <option value="">Dirham</option>
          </select>
          <p className="font-bold">Language</p>
          <select
            name=""
            id=""
            className="rounded-lg border px-3 py-2 outline-none"
          >
            <option value="">English</option>
            <option value="">Arabic</option>
          </select>
          <section className="flex items-center gap-2">
            <label htmlFor="delivery">Delivery Available</label>
            <input id="delivery" type="checkbox" className="accent-mainColor" />
          </section>
          <section className="flex items-center gap-2">
            <label htmlFor="dinein">Dine In Available</label>
            <input id="dinein" type="checkbox" className="accent-mainColor" />
          </section>
          <section className="flex items-center gap-2">
            <label htmlFor="pickup">Pickup Available</label>
            <input id="pickup" type="checkbox" className="accent-mainColor" />
          </section>
          <section className="flex items-center gap-2">
            <label htmlFor="vat">Vat Available</label>
            <input id="vat" type="checkbox" className="accent-mainColor" />
          </section>
          <button className="w-full rounded-lg bg-mainColor py-2 text-white">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Restaurants;
