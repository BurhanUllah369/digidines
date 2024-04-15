import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";

const EditAddOns = () => {
  const { selectedRestaurant } = useRestaurantsPathsContext();
  return (
    <section className="mx-auto my-12 w-11/12 bg-gray-100 px-6 py-12 xs:p-12 sm:w-5/6 md:w-3/5 lg:w-1/2">
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
          className="rounded-lg border px-3 py-2 outline-none"
        >
          <option value="">Multiple Choice</option>
          <option value="">Single Choice</option>
        </select>
        <input
          className="rounded-lg border px-3 py-2 text-sm outline-none"
          type="text"
          placeholder="Title"
        />
        <p className="mt-3 text-sm font-bold">Option 1</p>
        <section className="flex flex-col justify-between gap-3 sm:flex-row">
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Option 1 Name"
          />
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
            type="number"
            placeholder="Option 1 Price"
          />
          <button className="rounded-lg bg-red-600 px-3 py-1 text-white">
            Remove
          </button>
        </section>
        <p className="mt-3 text-sm font-bold">Option 2</p>
        <section className="flex flex-col justify-between gap-3 sm:flex-row">
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Option 2 Name"
          />
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
            type="number"
            placeholder="Option 2 Price"
          />
          <button className="rounded-lg bg-red-600 px-3 py-1 text-white">
            Remove
          </button>
        </section>
        <button className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-500 py-1 text-white">
          <IoMdAdd />
          <span> Add Option</span>
        </button>
        <section className="flex justify-center gap-4">
          <Link to={`/r/${selectedRestaurant}`}>
            <button className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white">
              <span> Cancel</span>
            </button>
          </Link>
          <button className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white">
            <span> Submit</span>
          </button>
        </section>
      </form>
    </section>
  );
};

export default EditAddOns;
