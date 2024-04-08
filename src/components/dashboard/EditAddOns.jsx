import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";

const EditAddOns = () => {
  const { selectedRestaurant } = useRestaurantsPathsContext();
  return (
    <section className="w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/2 mx-auto my-12 py-12 px-6 xs:p-12 bg-gray-100">
      <Link
        to={`/r/${selectedRestaurant}`}
        className="mb-4 flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <span>Back</span>
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Edit Addon</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        action=""
        className="mt-4 flex flex-col gap-3"
      >
        <select
          name=""
          id=""
          className="py-2 px-3 rounded-lg outline-none border"
        >
          <option value="">Multiple Choice</option>
          <option value="">Single Choice</option>
        </select>
        <input
          className="py-2 px-3 outline-none border rounded-lg text-sm"
          type="text"
          placeholder="Title"
        />
        <p className="font-bold text-sm mt-3">Option 1</p>
        <section className="flex flex-col sm:flex-row justify-between gap-3">
          <input
            className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Option 1 Name"
          />
          <input
            className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
            type="number"
            placeholder="Option 1 Price"
          />
          <button className="py-1 px-3 rounded-lg bg-red-600 text-white">
            Remove
          </button>
        </section>
        <p className="font-bold text-sm mt-3">Option 2</p>
        <section className="flex flex-col sm:flex-row justify-between gap-3">
          <input
            className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Option 2 Name"
          />
          <input
            className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
            type="number"
            placeholder="Option 2 Price"
          />
          <button className="py-1 px-3 rounded-lg bg-red-600 text-white">
            Remove
          </button>
        </section>
        <button className="mt-4 flex justify-center items-center gap-2 bg-green-500 py-1 rounded-lg text-white">
          <IoMdAdd />
          <span> Add Option</span>
        </button>
        <section className="flex justify-center gap-4">
          <Link to={`/r/${selectedRestaurant}`}>
            <button className="px-4 py-2 mt-4 bg-red-600 rounded-lg text-white">
              <span> Cancel</span>
            </button>
          </Link>
          <button className="px-4 py-2 mt-4 bg-green-500 rounded-lg text-white">
            <span> Submit</span>
          </button>
        </section>
      </form>
    </section>
  );
};

export default EditAddOns;
