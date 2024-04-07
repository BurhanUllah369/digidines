import React, { useState } from "react";
import { useSideMenuContext } from "../../context/sideMenuContext";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Restaurant = ({ name }) => {
  return (
    <section className="bg-white shadow-lg rounded">
      <img
        className="w-full rounded-t"
        src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/food-1.jpg"
        alt=""
      />
      <section className="p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          <span>{name}</span>
        </h2>
        <p className="mt-2 text-gray-500">digidines.com/r/a</p>
        <section className="flex justify-center gap-3">
          <button className="px-4 py-2 mt-4 bg-mainColor rounded text-white text-sm">
            Customer Menu
          </button>
          <Link to="/r">
            <button className="px-4 py-2 mt-4 bg-green-500 rounded text-white text-sm">
              Edit Restaurant
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
        } w-full ml-auto  p-4 sm:p-12`}
      >
        <section className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 xs:gap-0">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold">
            Restaurants
          </h1>
          <button
            onClick={() => setAddRestaurant(true)}
            className="flex items-center gap-2 text-sm sm:text-lg underline"
          >
            <span className="font-bold">Add Restaurants</span>
            <MdEdit className="" />
          </button>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mt-12">
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
        className={`w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/3 mx-auto ${
          addRestaurant ? "block" : "hidden"
        } absolute top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-12 sm:p-12 rounded-lg shadow-xl`}
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Add Restaurant</h1>
        <RxCross2
          onClick={() => setAddRestaurant(false)}
          className="absolute top-2 right-2 text-xl cursor-pointer"
        />
        <form className="flex flex-col gap-3" action="">
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Restaurant Name"
            onChange={(e) => {
              const value = e.target.value.trim().replace(/\s+/g, "-");
              setUrl(value);
            }}
          />
          <section>
            <p className="mb-2 mt-2 font-bold">Short name in URL</p>
            <p className="py-2 px-3 border rounded-lg text-gray-500 font-bold">
              digidines.com/r/{url}
            </p>
          </section>
          <p className="font-bold">Currency</p>
          <select
            name=""
            id=""
            className="py-2 px-3 outline-none border rounded-lg"
          >
            <option value="">US Dollar</option>
            <option value="">Dirham</option>
          </select>
          <p className="font-bold">Language</p>
          <select
            name=""
            id=""
            className="py-2 px-3 outline-none border rounded-lg"
          >
            <option value="">English</option>
            <option value="">Arabic</option>
          </select>
          <section className="flex gap-2 items-center">
            <label htmlFor="delivery">Delivery Available</label>
            <input id="delivery" type="checkbox" className="accent-mainColor" />
          </section>
          <section className="flex gap-2 items-center">
            <label htmlFor="dinein">Dine In Available</label>
            <input id="dinein" type="checkbox" className="accent-mainColor" />
          </section>
          <section className="flex gap-2 items-center">
            <label htmlFor="pickup">Pickup Available</label>
            <input id="pickup" type="checkbox" className="accent-mainColor" />
          </section>
          <section className="flex gap-2 items-center">
            <label htmlFor="vat">Vat Available</label>
            <input id="vat" type="checkbox" className="accent-mainColor" />
          </section>
          <button className="w-full py-2 bg-mainColor rounded-lg text-white">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Restaurants;
