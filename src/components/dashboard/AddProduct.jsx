import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";
import { useMenuContext } from "../../context/menuContext";

const AddProduct = () => {
  const { selectedRestaurantName, selectedRestaurantId } =
    useRestaurantsPathsContext();
  const { selectedMenuId } = useMenuContext();

  const [variations, setVariations] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [recommended, setRecommended] = useState(false);
  const [image, setImage] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [availableAddons, setAvailableAddons] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const addVariation = () => {
    setVariations([...variations, { name: "", price: "" }]);
  };

  const removeVariation = (index) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
  };

  const handleVariationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariations = [...variations];
    updatedVariations[index][name] = value;
    setVariations(updatedVariations);
  };

  const fetchAddons = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.GET_ADDONS}${selectedRestaurantId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAvailableAddons(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddons();
  }, []);

  const toggleAddonSelection = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAddons.length === 0) {
      setError("Please select at least one addon.");
      console.log("hello");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    } 
    if(variations.length === 0) {
      setError("Please add at least two variations.")
      setTimeout(() => {
        setError("")
      }, 2000);
      return;
    }

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("category", selectedMenuId);
    formData.append("title", name);
    formData.append("description", description);
    formData.append("is_most_selling", recommended);
    formData.append("is_visible", visible);
    formData.append("image", image);
    formData.append("order", 2);

    const allVariations = variations.map((variation) => ({
      menu_size: {
        description: variation.name,
      },
      price: variation.price,
    }));

    formData.append("variants", JSON.stringify(allVariations));

    formData.append("addons", JSON.stringify(selectedAddons));

    try {
      const response = await axios.post(
        API_ENDPOINTS.CREATE_MENU_ITEM,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.log(error.response.data);
    }
    navigate(`/r/${selectedRestaurantName}/edit-menu`)
  };

  return (
    <section className="mx-auto my-12 w-11/12 bg-gray-100 px-6 py-12 xs:p-12 sm:w-5/6 md:w-3/5">
      {error ? (
        <p
          className={`bg-red-600" mb-4 rounded-lg bg-red-500 py-2 text-center font-bold text-white`}
        >
          {error}
        </p>
      ) : null}
      <Link
        to={`/r/${selectedRestaurantName}/edit-menu`}
        className="mb-4 flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <span>Back</span>
      </Link>
      <h1 className="text-3xl font-bold">Add Product</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="mt-4 flex flex-col gap-3"
      >
        <input
          className="rounded-lg border px-3 py-2 text-sm outline-none"
          type="text"
          placeholder="Item name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        {/* Add variation start  */}
        {variations.map((variation, index) => (
          <section
            key={index}
            className="flex flex-col justify-between gap-3 sm:flex-row"
          >
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              type="text"
              placeholder="Variation Name"
              name="name"
              value={variation.name}
              required
              onChange={(e) => handleVariationChange(index, e)}
            />
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              type="number"
              placeholder="Variation Price"
              name="price"
              value={variation.price}
              required
              onChange={(e) => handleVariationChange(index, e)}
            />
            <button
              className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
              onClick={() => removeVariation(index)}
            >
              Remove
            </button>
          </section>
        ))}
        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-2 text-white"
          onClick={addVariation}
          type="button"
        >
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
          className="rounded-lg border px-3 py-2 text-sm outline-none"
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <section className="mt-3 flex items-center gap-2">
          <label className="text-sm" htmlFor="isVisible">
            Is Visible
          </label>
          <input
            onChange={(e) => setVisible(e.target.checked)}
            className="accent-mainColor"
            type="checkbox"
            id="isVisible"
          />
        </section>
        <section className="mt-3 flex items-center gap-2">
          <label className="text-sm" htmlFor="isRecommended">
            Is Recommended
          </label>
          <input
            className="accent-mainColor"
            type="checkbox"
            id="isRecommended"
            onChange={(e) => setRecommended(e.target.checked)}
          />
        </section>
        <label className="mt-3 text-sm" htmlFor="itemImage">
          Upload Item Image
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-3"
          type="file"
          id="itemImage"
          accept="image/*"
          required
        />
        <p className="mt-3 font-bold">Addons</p>
        <div>
          {availableAddons.map((addon) => (
            <span
              key={addon.id}
              className={`${
                selectedAddons.includes(addon.id)
                  ? "bg-green-500 text-white"
                  : ""
              } m-2 cursor-pointer rounded-lg border border-gray-700 px-2 py-1 font-bold`}
              onClick={() => toggleAddonSelection(addon.id)}
            >
              {addon.title}
              {selectedAddons.includes(addon.id) && (
                <span
                  className="ml-1 cursor-pointer text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAddons(
                      selectedAddons.filter((item) => item !== addon.id),
                    );
                  }}
                >
                  <span className="ml-2">x</span>
                </span>
              )}
            </span>
          ))}
        </div>
        <section className="mt-4 flex gap-4">
          <Link
            to={`/r/${selectedRestaurantName}/edit-menu`}
            className="flex w-full items-center justify-center rounded-lg bg-headerBg"
          >
            <button className="text-white">Back</button>
          </Link>
          <button className="w-full rounded-lg bg-green-500 py-2 text-white">
            Create
          </button>
        </section>
      </form>
    </section>
  );
};

export default AddProduct;
