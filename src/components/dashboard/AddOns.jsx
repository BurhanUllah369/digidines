import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEditRestaurantContext } from "../../context/editRestaurant";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";
import { useAddonIdContext } from "../../context/addonIdContext";
import { useSelectedAddonContext } from "../../context/addonData";

const AddOn = ({
  selectedRestaurantName,
  addonId,
  name,
  type,
  price,
  options,
  fetchAddons,
  setSuccess,
  setError,
}) => {
  const {updateAddonId} = useAddonIdContext()
  const {updateSelectedAddonData} = useSelectedAddonContext()

  const handleDelClick = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this addon?",
    );
    if (!isConfirmed) {
      return;
    }

    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${API_ENDPOINTS.DELETE_ADDON}${addonId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAddons();
      setSuccess("Addon deleted successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      setError("Error deleting addon");
      setTimeout(() => {
        setError("");
      }, 2000);
      console.log(error);
    }
  };

  const handleEditClick = () => {
    const addonData = {
      id: addonId,
      title: name,
      type: type,
      options: options,
    };
    updateSelectedAddonData(addonData);
    updateAddonId(addonId);
  };


  return (
    <section className="flex flex-col gap-4 rounded-lg border px-6 py-4 shadow-lg">
      <h2 className="text-center text-xl font-bold">{name}</h2>
      <p className="flex items-center justify-between">
        <span className="text-sm">Type:</span>
        <span className="font-bold">{type}</span>
      </p>
      {options.map((option, idx) => (
        <p key={idx} className="flex items-center justify-between">
          <span className="text-sm">{option.option}</span>
          <span className="font-bold">${option.price}</span>
        </p>
      ))}

      <section className="mt-3 flex items-center justify-center gap-4 text-sm">
        <Link to={`/r/${selectedRestaurantName}/edit-addon`}>
          <button onClick={handleEditClick} className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-3 py-1 text-white">
            <span>Edit</span>
            <MdEdit className="" />
          </button>
        </Link>
        <button
          onClick={handleDelClick}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-1 text-white"
        >
          <span>Delete</span>
          <MdDelete className="" />
        </button>
      </section>
    </section>
  );
};

const AddOns = () => {
  const { showRestaurantSection } = useEditRestaurantContext();
  const { selectedRestaurantName, selectedRestaurantId } =
    useRestaurantsPathsContext();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // get addons
  const [addons, setAddons] = useState([]);

  const fetchAddons = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.GET_ADDONS}${selectedRestaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAddons(response.data);
    } catch (error) {
      setError("Error fetching Addons");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    fetchAddons();
  }, []);

  return (
    <section
      className={`${showRestaurantSection == 2 ? "block" : "hidden"} mb-12`}
    >
      {success || error ? (
        <p
          className={`mt-12 rounded-lg py-2 text-center font-bold text-white ${success ? "bg-green-500" : "bg-red-600"}`}
        >
          {success || error}
        </p>
      ) : null}
      <section className="mt-12 flex items-center justify-between">
        <h1 className="text-xl font-bold sm:text-3xl">Add-Ons</h1>
        <Link to={`/r/${selectedRestaurantName}/add-addon`}>
          <button className="flex items-center justify-center gap-1 text-sm font-bold underline sm:text-base">
            <span>Add AddOn</span>
            <IoMdAdd />
          </button>
        </Link>
      </section>
      <section className="mt-4 grid sm:grid-cols-2 gap-4 ">
        {addons.length ? (
          addons.map((addon) => (
            <AddOn
              key={addon.id}
              selectedRestaurantName={selectedRestaurantName}
              name={addon.title}
              type={addon.type}
              price={addon.price}
              options={addon.options}
              addonId={addon.id}
              fetchAddons={fetchAddons}
              setSuccess={setSuccess}
              setError={setError}
            />
          ))
        ) : (
          <h1 className="col-span-3 text-center text-lg font-bold sm:text-2xl">
            No Addons to show
          </h1>
        )}
      </section>
    </section>
  );
};

export default AddOns;
