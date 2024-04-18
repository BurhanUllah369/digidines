import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";

const AddAddon = () => {
  const { selectedRestaurantName, selectedRestaurantId } =
    useRestaurantsPathsContext();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate()

  const [options, setOptions] = useState([{ name: "", price: "" }]);

  const addOption = () => {
    setOptions([...options, { name: "", price: "" }]);
  };

  const removeOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      const formattedOptions = options.map((option) => ({
        option: option.name,
        price: parseFloat(option.price),
      }));

      await axios.post(
        API_ENDPOINTS.ADD_ADDON,
        {
          title,
          type,
          options: formattedOptions,
          restaurant: selectedRestaurantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Addon added successfully!");
    } catch (error) {
      console.log("Error adding addon:", error);
    }
    navigate(`/r/${selectedRestaurantName}`)
  };

  return (
    <section className="mx-auto my-12 w-11/12 bg-gray-100 px-6 py-12 xs:p-12 sm:w-5/6 md:w-3/5 lg:w-1/2">
      <Link
        to={`/r/${selectedRestaurantName}`}
        className="mb-4 flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <span>Back</span>
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Add Addon</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-lg px-3 py-2 outline-none"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          name="type"
          id="type"
          className="rounded-lg border px-3 py-2 outline-none"
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
        </select>
        {options.map((option, index) => (
          <div
            className="flex flex-col justify-between gap-3 sm:flex-row"
            key={index}
          >
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              type="text"
              placeholder={`Option ${index + 1} Name`}
              required
              value={option.name}
              onChange={(e) => {
                const updatedOptions = [...options];
                updatedOptions[index].name = e.target.value;
                setOptions(updatedOptions);
              }}
            />
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              type="number"
              placeholder={`Option ${index + 1} Price`}
              value={option.price}
              required
              onChange={(e) => {
                const updatedOptions = [...options];
                updatedOptions[index].price = e.target.value;
                setOptions(updatedOptions);
              }}
            />
            {options.length > 1 && (
              <button
                className="rounded-lg bg-red-600 px-3 py-1 text-white"
                onClick={() => removeOption(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-500 py-1 text-white"
          onClick={addOption}
          type="button"
        >
          <IoMdAdd />
          <span> Add Option</span>
        </button>
        <section className="flex justify-center gap-4">
          <Link to={`/r/${selectedRestaurantName}`}>
            <button className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white">
              <span> Cancel</span>
            </button>
          </Link>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white"
          >
            <span> Submit</span>
          </button>
        </section>
      </form>
    </section>
  );
};

export default AddAddon;
