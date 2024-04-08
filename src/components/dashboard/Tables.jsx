import React, { useState } from "react";
import { useEditRestaurantContext } from "../../context/editRestaurant";

const Table = ({setEditTable}) => {
  const delTable = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this table?"
    );
    if (confirm) window.alert("Table Deleted!");
  };

  return (
    <section>
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
          <button onClick={setEditTable} className="text-green-500 text-sm font-bold">Edit</button>
          <button onClick={delTable} className="text-red-600 text-sm font-bold">
            Delete
          </button>
        </section>
      </section>
    </section>
  );
};

const Form = () => {
  return (
    <section className={`${addLocation ? "block" : "hidden"} mb-6`}>
      <h1 className="mb-3 font-bold text-xl">Add Tables Location</h1>
      <form onSubmit={(e) => e.preventDefault()} action="">
        <input
          className="py-2 px-3 rounded-lg border outline-none"
          type="text"
          placeholder="Location"
        />
        <section className="mt-4 flex gap-2">
          <button className="py-2 px-4 bg-red-600 outline-none rounded-lg text-white">
            Cancel
          </button>
          <button className="py-2 px-4 bg-green-500 outline-none rounded-lg text-white">
            Update
          </button>
        </section>
      </form>
    </section>
  );
};

const Tables = () => {
  const { showRestaurantSection } = useEditRestaurantContext();
  const [editLocation, setEditLocation] = useState(false);
  const [addLocation, setAddLocation] = useState(false);
  const [addTable, setAddTable] = useState(false);
  const [addTableBulk, setAddTableBulk] = useState(false);
  const [editTable, setEditTable] = useState(false)

  const delLocation = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this location?"
    );
    if (confirm) window.alert("Location Deleted!");
  };

  return (
    <section
      className={`${showRestaurantSection == 3 ? "block" : "hidden"} mt-12`}
    >
      {/* edit tables location  */}
      <section className={`${editLocation ? "block" : "hidden"} mb-6`}>
        <h1 className="mb-3 font-bold text-xl">Edit Tables Location</h1>
        <form onSubmit={(e) => e.preventDefault()} action="">
          <input
            className="py-2 px-3 rounded-lg border outline-none"
            type="text"
            placeholder=""
          />
          <section className="mt-4 flex gap-2">
            <button
              onClick={() => setEditLocation(false)}
              className="py-2 px-4 bg-red-600 outline-none rounded-lg text-white"
            >
              Cancel
            </button>
            <button onClick={() => setEditLocation(false)} className="py-2 px-4 bg-green-500 outline-none rounded-lg text-white">
              Update
            </button>
          </section>
        </form>
      </section>

      {/* add tables location  */}
      <section className={`${addLocation ? "block" : "hidden"} mb-6`}>
        <h1 className="mb-3 font-bold text-xl">Add Tables Location</h1>
        <form onSubmit={(e) => e.preventDefault()} action="">
          <input
            className="py-2 px-3 rounded-lg border outline-none"
            type="text"
            placeholder="Location"
          />
          <section className="mt-4 flex gap-2">
            <button
              onClick={() => setAddLocation(false)}
              className="py-2 px-4 bg-red-600 outline-none rounded-lg text-white"
            >
              Cancel
            </button>
            <button onClick={() => setAddLocation(false)} className="py-2 px-4 bg-green-500 outline-none rounded-lg text-white">
              Update
            </button>
          </section>
        </form>
      </section>

      {/* add table  */}
      <section className={`${addTable ? "block" : "hidden"} mb-6`}>
        <h1 className="mb-3 font-bold text-xl">Add Table</h1>
        <form onSubmit={(e) => e.preventDefault()} action="">
          <input
            className="py-2 px-3 rounded-lg border outline-none"
            type="number"
            placeholder="Table Number"
          />
          <section className="mt-4 flex gap-2">
            <button
              onClick={() => setAddTable(false)}
              className="py-2 px-4 bg-red-600 outline-none rounded-lg text-white"
            >
              Cancel
            </button>
            <button onClick={() => setAddTable(false)} className="py-2 px-4 bg-green-500 outline-none rounded-lg text-white">
              Update
            </button>
          </section>
        </form>
      </section>

      {/* add tables bulk  */}
      <section className={`${addTableBulk ? "block" : "hidden"} mb-6`}>
        <h1 className="mb-3 font-bold text-xl">Add Tables Bulk</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-start gap-3"
          action=""
        >
          <input
            className="py-2 px-3 rounded-lg border outline-none"
            type="text"
            placeholder="Table Name"
          />
          <input
            className="py-2 px-3 rounded-lg border outline-none"
            type="number"
            placeholder="Starting number"
          />
          <input
            className="py-2 px-3 rounded-lg border outline-none"
            type="number"
            placeholder="Ending Number"
          />
          <section className="mt-4 flex gap-2">
            <button
              onClick={() => setAddTableBulk(false)}
              className="py-2 px-4 bg-red-600 outline-none rounded-lg text-white"
            >
              Cancel
            </button>
            <button onClick={() => setAddTableBulk(false)} className="py-2 px-4 bg-green-500 outline-none rounded-lg text-white">
              Update
            </button>
          </section>
        </form>
      </section>

      {/* edit table  */}

      <section className={`${editTable ? "block" : "hidden"} mb-6`}>
        <h1 className="mb-3 font-bold text-xl">Edit Table</h1>
        <form className="flex flex-col items-start" onSubmit={(e) => e.preventDefault()} action="">
          <input
            className="py-2 px-3 rounded-lg border outline-none"
            type="text"
            placeholder="Table Name"
          />
          <select className="w-52 mt-3 py-2 px-3 border outline-none rounded-lg" name="" id="">
            <option value="">Available</option>
            <option value="">Unavailable</option>
          </select>
          <section className="mt-4 flex gap-2">
            <button
              onClick={() => setEditTable(false)}
              className="py-2 px-4 bg-red-600 outline-none rounded-lg text-white"
            >
              Cancel
            </button>
            <button onClick={() => setEditTable(false)} className="py-2 px-4 bg-green-500 outline-none rounded-lg text-white">
              Update
            </button>
          </section>
        </form>
      </section>

      {/* Tables  */}
      <h1 className="text-xl sm:text-3xl font-bold">Tables</h1>
      <section className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-5">
        <select
          name=""
          id=""
          className="p-2 border rounded-lg outline-none text-xs xs:text-sm"
        >
          <option>Ground</option>
          <option value="">Floor</option>
        </select>
        <button
          onClick={() => {
            setEditLocation(true);
            setAddTable(false);
            setAddLocation(false);
            setAddTable(false);
            setAddTableBulk(false);
          }}
          className="px-5 py-2 bg-green-500 rounded-lg text-white text-xs xs:text-sm"
        >
          Edit Location
        </button>
        <button
          onClick={delLocation}
          className="px-5 py-2 bg-red-600 rounded-lg text-white text-xs xs:text-sm"
        >
          Delete Location
        </button>
      </section>
      <section className="mt-4 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-5 text-xs xs:text-sm">
        <button
          onClick={() => {
            setEditLocation(false);
            setAddTable(false);
            setAddLocation(true);
            setAddTable(false);
            setAddTableBulk(false);
          }}
          className="px-5 py-2 bg-green-500 rounded-lg text-white"
        >
          Add Location
        </button>
        <button
          onClick={() => {
            setAddTable(true);
            setEditLocation(false);
            setAddLocation(false);
            setAddTableBulk(false);
          }}
          className="px-5 py-2 bg-green-500 rounded-lg text-white"
        >
          Add Table
        </button>
        <button
          onClick={() => {
            setEditLocation(false);
            setAddTable(false);
            setAddLocation(false);
            setAddTable(false);
            setAddTableBulk(true);
          }}
          className="px-5 py-2 bg-green-500 rounded-lg text-white"
        >
          Add Table-Bulk
        </button>
      </section>

      {/* tables  */}
      <Table setEditTable={setEditTable} />
      <Table setEditTable={setEditTable} />
      <Table setEditTable={setEditTable} />
      <Table setEditTable={setEditTable} />
    </section>
  );
};

export default Tables;
