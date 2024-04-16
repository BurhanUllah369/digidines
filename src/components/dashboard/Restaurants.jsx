import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import { IoFastFood } from "react-icons/io5";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";

const Restaurant = ({ urlName, id, name, imageUrl }) => {
  const { restaurantId, restaurantName, selectedRestaurantName } =
    useRestaurantsPathsContext();

  const formatRestaurantNameForUrl = (name) => {
    return name.trim().replace(/\s+/g, "-").toLowerCase();
  };

  const handleRestaurantClick = () => {
    restaurantId(id);
    restaurantName(urlName);
    // console.log(selectedRestaurantName)
  };

  return (
    <section className="rounded bg-white shadow-lg transition duration-150 ease-linear hover:shadow-2xl">
      <img
        className="h-[200px] w-full rounded-t object-cover"
        src={
          imageUrl ||
          "https://static.vecteezy.com/system/resources/previews/006/303/639/non_2x/simple-icon-local-restaurant-logo-template-design-inspiration-vector.jpg"
        }
        alt=""
      />
      <section className="p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          <span>{name}</span>
        </h2>
        <p className="mt-2 text-gray-500">
          digidines.com/r/{selectedRestaurantName}
        </p>
        <section className="mt-4 flex justify-center gap-4">
          <Link
            onClick={handleRestaurantClick}
            to={`/menus/${selectedRestaurantName}`}
          >
            <button className="flex w-full items-center  gap-2 rounded bg-mainColor px-4 py-2 text-sm text-white">
              <IoFastFood className="text-lg" />
              <span>Menu</span>
            </button>
          </Link>
          <Link
            onClick={handleRestaurantClick}
            to={`/r/${selectedRestaurantName}`}
          >
            <button className="flex w-full items-center gap-2 rounded bg-green-500 px-4 py-2 text-sm text-white">
              <MdModeEditOutline className="text-lg" />
              <span>Edit</span>
            </button>
          </Link>
        </section>
      </section>
    </section>
  );
};

const Restaurants = () => {
  const [addRestaurant, setAddRestaurant] = useState(false);
  const [url, setUrl] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  // getting restaurants
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(API_ENDPOINTS.RESTAURANTS, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        .then((response) => {
          setRestaurants(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // create restaurant
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState(1);
  const [language, setLanuage] = useState("EN");
  const [delivery, setDelivery] = useState(false);
  const [dinein, setDinein] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [vat, setVat] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .post(
          API_ENDPOINTS.CREATE_RESTAURANT,
          {
            name: name,
            currency: currency,
            language: language,
            qr_code: {
              qr_link: `r/${url}`,
            },
            service_options: {
              delivery_available: delivery,
              dine_in_available: dinein,
              pickup_available: pickup,
              vat_applicable: vat,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((response) => {
          setSuccess(response.statusText);
          setName("");
        })
        .catch((error) => {
          // console.log(error.response.data);
          setError(
            error.response.data.error ||
              error.response.data.qr_code.qr_link[0].charAt(0).toUpperCase() +
                error.response.data.qr_code.qr_link[0].slice(1),
          );
        });
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      setAddRestaurant(false);
    }
  };

  return (
    <div className="">
      <section
        className={`${
          addRestaurant ? "opacity-5" : "opacity-100"
        } ml-auto w-full  p-4 sm:p-12`}
      >
        {success || error ? (
          <p
            className={`mb-4 rounded-lg px-3 py-2 text-center font-bold text-white ${success ? "bg-green-500" : "bg-red-600"}`}
          >
            {error || success}
          </p>
        ) : null}
        <section className="flex flex-col justify-between gap-2 xs:flex-row xs:items-center xs:gap-0">
          <h1 className="text-2xl font-bold xs:text-3xl sm:text-4xl">
            Restaurants
          </h1>
          <button
            onClick={() => setAddRestaurant(true)}
            className="flex items-center gap-2 text-sm underline sm:text-lg"
          >
            <span className="font-bold">Add Restaurants</span>
            <MdEdit className="" />
          </button>
        </section>
        <section className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          {restaurants.map((res) =>
            <Restaurant
              key={res.id}
              id={res.id}
              name={res.name}
              imageUrl={res.image_restaurant_url}
              urlName={res.qr_code.qr_link.slice(2)}
            />
            // console.log(res.qr_code.qr_link.slice(2)),
          )}
        </section>
      </section>

      {/* add Restaurant  */}

      <section
        className={`mx-auto w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/3 ${
          addRestaurant ? "block" : "hidden"
        } absolute left-1/2 top-24 -translate-x-1/2 rounded-lg bg-white px-4 py-12 shadow-xl sm:p-12`}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">Add Restaurant</h1>
        <RxCross2
          onClick={() => setAddRestaurant(false)}
          className="absolute right-2 top-2 cursor-pointer text-xl"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3" action="">
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Restaurant Name"
            required
            value={name}
            onChange={(e) => {
              const val = e.target.value.trim().replace(/\s+/g, "-");
              setUrl(val);
              setName(e.target.value);
            }}
          />
          <section>
            <p className="mb-2 mt-2 font-bold">Short name in URL</p>
            <p className="rounded-lg border px-3 py-2 font-bold text-gray-500">
              digidines.com/r/{url}
            </p>
          </section>
          <select
            name="currency"
            id="currency"
            className="rounded-lg border px-3 py-2 outline-none"
            value={currency}
            required
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            <option value={1}>US Dollar</option>
            <option value={2}>Dirham</option>
          </select>
          <p className="font-bold">Language</p>
          <select
            name="language"
            id="language"
            className="rounded-lg border px-3 py-2 outline-none"
            value={language}
            onChange={(e) => setLanuage(e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="EN">English</option>
            <option value="AR">Arabic</option>
          </select>
          <section className="flex items-center gap-2">
            <label htmlFor="delivery">Delivery Available</label>
            <input
              onChange={(e) => setDelivery(e.target.checked)}
              id="delivery"
              type="checkbox"
              className="accent-mainColor"
            />
          </section>
          <section className="flex items-center gap-2">
            <label htmlFor="dinein">Dine In Available</label>
            <input
              onChange={(e) => setDinein(e.target.checked)}
              id="dinein"
              type="checkbox"
              className="accent-mainColor"
            />
          </section>
          <section className="flex items-center gap-2">
            <label htmlFor="pickup">Pickup Available</label>
            <input
              onChange={(e) => setPickup(e.target.checked)}
              id="pickup"
              type="checkbox"
              className="accent-mainColor"
            />
          </section>
          <section className="flex items-center gap-2">
            <label htmlFor="vat">Vat Available</label>
            <input
              onChange={(e) => setVat(e.target.checked)}
              id="vat"
              type="checkbox"
              className="accent-mainColor"
            />
          </section>
          <button className="w-full rounded-lg bg-mainColor py-2 text-white">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Restaurants;
