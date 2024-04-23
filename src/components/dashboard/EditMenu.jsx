import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";
import { useProductContext } from "../../context/productContext";

const MenuItem = ({
  productId,
  price,
  selectedRestaurantName,
  fetchMenus,
  setSuccess,
  setError,
  item,
}) => {
  const { updateProduct } = useProductContext();
  const handleDelProduct = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?",
    );
    if (isConfirmed) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          await axios.delete(`${API_ENDPOINTS.DELETE_MENU_ITEM}${productId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchMenus();
          setSuccess("Item deleted successfully");
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        } catch (error) {
          setError("An error Occurred");
          setTimeout(() => {
            setError("");
          }, 2000);
          console.log(error);
        }
      }
    }
  };

  return (
    <section className="rounded bg-white shadow-lg">
      <img
        className="h-40 w-full rounded-t object-cover"
        src={item.image_dropbox_url2}
        alt="Product Image"
      />
      <section className="p-3 xs:p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          <span className="text-2xl">{item.title}</span>
          {price ? (
            <span className="rounded-lg bg-mainColor p-2 text-base text-white">
              ${price}
            </span>
          ) : null}
        </h2>
        <p className="mt-2 text-gray-500">{item.description}</p>
        <section className="mt-4 flex items-center justify-center gap-1 rounded-lg py-2 text-lg sm:gap-3">
          <Link to={`/r/${selectedRestaurantName}/edit-menu/edit-product`}>
            <button
              onClick={() => {
                updateProduct(item);
              }}
              className="flex items-center gap-1 rounded-lg bg-green-500 px-3 py-1 text-xs text-white xs:gap-2 xs:text-sm"
            >
              <p>Edit</p>
              <MdEdit className="cursor-pointer" />
            </button>
          </Link>
          <button
            onClick={handleDelProduct}
            className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-xs text-white xs:gap-2 xs:text-sm"
          >
            <p>Delete</p>
            <MdDelete className="cursor-pointer" />
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-mainColor px-3 py-1 text-xs text-white xs:gap-2 xs:text-sm">
            <p>Details</p>
            <IoListSharp className="cursor-pointer" />
          </button>
        </section>
      </section>
    </section>
  );
};

const EditMenu = () => {
  const { selectedRestaurantName, selectedRestaurantId } =
    useRestaurantsPathsContext();
  const [menuItems, setMenuItems] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // get menu items

  const fetchMenus = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get(`${API_ENDPOINTS.MENU_LIST}${selectedRestaurantId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data[0].menu_items);
          setMenuItems(response.data[0].menu_items);
        })
        .catch((error) => setMessage("Error getting restaurants"));
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <section className="mx-auto my-12 w-11/12 sm:w-5/6 lg:w-3/4">
      <Link
        to={`/r/${selectedRestaurantName}`}
        className="mb-6 flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <span>Back</span>
      </Link>
      {success || error ? (
        <p
          className={`mt-12 rounded-lg py-2 text-center font-bold text-white ${success ? "bg-green-500" : "bg-red-600"}`}
        >
          {success || error}
        </p>
      ) : null}
      <section className="flex items-center justify-between">
        <h1 className="text-xl font-bold xs:text-3xl">Menu Items</h1>
        <Link to={`/r/${selectedRestaurantName}/edit-menu/add-product`}>
          <button className="flex items-center justify-center gap-2 text-sm underline xs:text-base">
            <IoMdAdd />
            <span>Add Menu Item</span>
          </button>
        </Link>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <MenuItem
              key={item.id}
              price={item.variants.length > 1 ? null : item.variants[0].price}
              selectedRestaurantName={selectedRestaurantName}
              fetchMenus={fetchMenus}
              setSuccess={setSuccess}
              setError={setError}
              item={item}
            />
          ))
        ) : (
          <h1 className="col-span-3 text-center text-lg font-bold sm:text-2xl">
            No Items to show
          </h1>
        )}
      </section>
    </section>
  );
};

export default EditMenu;
