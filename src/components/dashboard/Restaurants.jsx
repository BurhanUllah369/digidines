import React from "react";
import { CiSettings } from "react-icons/ci";
import { useSideMenuContext } from "../../context/sideMenuContext";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";

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
          <Link to="/r">
            <CiSettings />
          </Link>
        </h2>
        <p className="mt-2 text-gray-500">digidines.com/r/a</p>
        <button className="w-full py-3 mt-4 bg-mainColor rounded text-white">
          Customer Menu
        </button>
      </section>
    </section>
  );
};

const Restaurants = () => {
  const { sideMenu } = useSideMenuContext();

  return (
    <div className="">
      <section
        style={{ transition: "0.5s ease" }}
        className={`${
          sideMenu ? "w-full lg:3/5 xl:w-3/4" : "w-full"
        } ml-auto p-6 xs:p-12`}
      >
        <section className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-center">Restaurants</h1>
          <button className="flex items-center gap-2 text-lg underline">
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
    </div>
  );
};

export default Restaurants;
