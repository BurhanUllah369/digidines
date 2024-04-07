import React from "react";
import { useEditRestaurantContext } from "../../context/editRestaurant";

const Table = () => {
  return (
    <section>
      <section className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-5">
        <select
          name=""
          id=""
          className="p-2 border rounded-lg outline-none text-xs xs:text-sm"
        >
          <option>Ground</option>
          <option value="">Floor</option>
        </select>
        <button className="px-5 py-2 bg-green-500 rounded-lg text-white text-xs xs:text-sm">
          Edit Location
        </button>
        <button className="px-5 py-2 bg-red-600 rounded-lg text-white text-xs xs:text-sm">
          Delete Location
        </button>
      </section>
      <section className="mt-4 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-5 text-xs xs:text-sm">
        <button className="px-5 py-2 bg-green-500 rounded-lg text-white">
          Add Location
        </button>
        <button className="px-5 py-2 bg-green-500 rounded-lg text-white">
          Add Table
        </button>
        <button className="px-5 py-2 bg-green-500 rounded-lg text-white">
          Add Table-Bulk
        </button>
      </section>

      {/* tables  */}
      <section className="mb-4 px-3 py-2 flex items-center justify-between border rounded-lg">
        <section className="text-xs xs:text-sm">
          <p>
            Name: <span className="font-bold">A100</span>
          </p>
          <p>
            Status: <span className="font-bold">Available</span>
          </p>
        </section>
        <section className="flex gap-3">
          <button className="text-green-500 text-sm font-bold">Edit</button>
          <button className="text-red-600 text-sm font-bold">Delete</button>
        </section>
      </section>
      <section className="mb-4 px-3 py-2 flex items-center justify-between border rounded-lg">
        <section className="text-xs xs:text-sm">
          <p>
            Name: <span className="font-bold">A100</span>
          </p>
          <p>
            Status: <span className="font-bold">Available</span>
          </p>
        </section>
        <section className="flex gap-3">
          <button className="text-green-500 text-sm font-bold">Edit</button>
          <button className="text-red-600 text-sm font-bold">Delete</button>
        </section>
      </section>
      <section className="mb-4 px-3 py-2 flex items-center justify-between border rounded-lg">
        <section className="text-xs xs:text-sm">
          <p>
            Name: <span className="font-bold">A100</span>
          </p>
          <p>
            Status: <span className="font-bold">Available</span>
          </p>
        </section>
        <section className="flex gap-3">
          <button className="text-green-500 text-sm font-bold">Edit</button>
          <button className="text-red-600 text-sm font-bold">Delete</button>
        </section>
      </section>
    </section>
  );
};

const Tables = () => {
  const {showRestaurantSection} = useEditRestaurantContext()

  return (
    <section className={`${showRestaurantSection == 3 ? "block" : "hidden"} mt-12`}>
      <h1 className="text-xl sm:text-3xl font-bold">Tables</h1>
      <Table />
    </section>
  );
};

export default Tables;
