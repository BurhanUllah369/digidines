import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";

const EditProduct = () => {
  const { selectedRestaurant } = useRestaurantsPathsContext();
  return (
    <section className="w-11/12 sm:w-5/6 md:w-3/5 mx-auto my-12 py-12 px-6 xs:p-12 bg-gray-100">
      <Link
        to={`/r/${selectedRestaurant}/edit-menu`}
        className="mb-4 flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <span>Back</span>
      </Link>
      <h1 className="text-3xl font-bold">Add Product</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        action=""
        className="mt-4 flex flex-col gap-3"
      >
        <input
          className="py-2 px-3 outline-none border rounded-lg text-sm"
          type="text"
          placeholder="Item name"
        />
        <input
          className="py-2 px-3 outline-none border rounded-lg text-sm"
          type="number"
          placeholder="Price"
        />

        {/* Add variation start  */}
        <p className="mt-3 font-bold">Variation 1</p>
        <section className="flex flex-col sm:flex-row justify-between gap-3">
          <input
            className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Variation 1 Name"
          />
          <input
            className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
            type="number"
            placeholder="Variation 1 Price"
          />
          <button className="px-4 py-2 bg-red-600 rounded-lg text-white text-sm">
            Remove
          </button>
        </section>
        <button className="w-full flex justify-center items-center gap-2 py-2 bg-green-500 rounded-lg text-white">
          <IoMdAdd />
          <span>Add Variation</span>
        </button>

        {/* add variation end  */}

        <textarea
          name=""
          id=""
          cols="30"
          rows="4"
          placeholder="Description"
          className="py-2 px-3 outline-none border rounded-lg text-sm"
        ></textarea>
        <section className="mt-3 flex items-center gap-2">
          <label className="text-sm" htmlFor="isVisible">
            Is Visible
          </label>
          <input className="accent-mainColor" type="checkbox" id="isVisible" />
        </section>
        <section className="mt-3 flex items-center gap-2">
          <label className="text-sm" htmlFor="isRecommended">
            Is Recommended
          </label>
          <input
            className="accent-mainColor"
            type="checkbox"
            id="isRecommended"
          />
        </section>
        <label className="mt-3 text-sm" htmlFor="itemImage">
          Upload Item Image
        </label>
        <input className="mt-3" type="file" id="itemImage" accept="image/*" />
        <select
          name=""
          id=""
          className="mt-3 py-2 px-3 outline-none border rounded-lg"
        >
          <option value="">Select</option>
          <option value="">Add On 1</option>
          <option value="">Add On 1</option>
        </select>
        <section className="mt-4 flex gap-4">
          <Link
            to={`/r/${selectedRestaurant}/edit-menu`}
            className="w-full bg-headerBg rounded-lg flex items-center justify-center"
          >
            <button className="text-white">Back</button>
          </Link>
          <button className="w-full py-2 bg-green-500 rounded-lg text-white">
            Create
          </button>
        </section>
      </form>
    </section>
  );
};

export default EditProduct;
