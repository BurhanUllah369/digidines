import React, { useState } from "react";
import { useRestaurantDetailsContext } from "../../context/restaurantDetailsContext";
import { FaWifi } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdDelete, MdOutlineDescription } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaGift } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const EditMenu = () => {
  const { showSection } = useRestaurantDetailsContext();
  const [editRestaurant, setEditRestaurant] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [settings, setSettings] = useState(false);

  return (
    <div
      className={`${showSection === 1 ? "block" : "hidden"}  w-full relative`}
    >
      <section
        className={`w-2/3 mx-auto mt-12 ${
          editRestaurant || coupon || settings ? "opacity-20" : "opacity-100"
        }`}
      >
        <section className="relative">
          <img
            className="w-full h-48 object-cover rounded-lg"
            src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/add-product-2.jpg"
            alt=""
          />
          <img
            className="w-32 absolute bottom-0 left-0 rounded-full"
            src="https://www.kindpng.com/picc/m/201-2011704_restaurant-jd-sports-logo-png-transparent-png.png"
            alt=""
          />
        </section>
        <section className="mt-6">
          <section className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Cheezious</h1>
            <section className="flex gap-4 text-xl">
              <MdEdit
                onClick={() => setEditRestaurant(true)}
                className="text-mainColor cursor-pointer"
              />
              <IoIosSettings
                onClick={() => setSettings(true)}
                className="text-mainColor cursor-pointer"
              />
              <FaGift
                onClick={() => setCoupon(true)}
                className="text-mainColor cursor-pointer"
              />
            </section>
          </section>
          <p className="flex items-center gap-2 mt-4">
            <FaWifi className="text-mainColor" />
            <span>1234534</span>
          </p>
          <p className="flex items-center gap-2 my-2">
            <IoLocation className="text-mainColor" />
            <span>Area no 1, City</span>
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineDescription className="text-mainColor" />
            <span>This is the description of the restaurant</span>
          </p>
        </section>
      </section>

      {/* edit restaurant  */}
      <section
        className={`w-1/3 mx-auto ${
          editRestaurant ? "block" : "hidden"
        } absolute top-0 left-1/2 -translate-x-1/2 bg-white p-12 rounded-lg shadow-xl`}
      >
        <h1 className="mb-6 text-2xl font-bold text-center">
          Edit Restaurant Data
        </h1>
        <RxCross2
          onClick={() => setEditRestaurant(false)}
          className="absolute top-2 right-2 text-xl cursor-pointer"
        />
        <form className="flex flex-col gap-4" action="">
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Name"
          />
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Placeholder"
          />
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Description"
          />
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="text"
            placeholder="Wifi Password"
          />
          <label className="text-lg font-bold">Restaurant Image</label>
          <input type="file" />
          <label className="text-lg font-bold">Restaurant Logo</label>
          <input type="file" />
          <button className="w-full py-2 bg-mainColor rounded-lg text-white">
            Submit
          </button>
        </form>
      </section>

      {/* coupon  */}

      <section
        className={`${
          coupon ? "block" : "hidden"
        } w-1/3 absolute top-16 left-1/2 -translate-x-1/2 bg-white p-8`}
      >
        <h1 className="mb-4 pb-3 border-b text-2xl font-bold">Coupons</h1>
        <RxCross2
          onClick={() => setCoupon(false)}
          className="absolute top-2 right-2 text-xl cursor-pointer"
        />
        <section>
          <section className="flex justify-between items-center">
            <h2 className="mt-4 mb-3 text-xl font-bold">Coupon Details</h2>
            <section className="flex gap-2 text-lg">
              <MdEdit className="text-green-600" />
              <MdDelete className="text-red-600" />
            </section>
          </section>
          <section className="text-gray-600">
            <p>Discount Percentage: 20</p>
            <p>Order Requirements: 2</p>
            <p>Minimum Order Price: 10.00</p>
            <p>Expiry Duration: 30</p>
            <p>Is Currently Active: true</p>
            <p>Activation Date: 2024-03-16</p>
            <p>Created At: 2024-03-16</p>
          </section>
        </section>
      </section>

      {/* restaurant settings  */}
      <section
        className={`w-1/3 mx-auto ${
          settings ? "block" : "hidden"
        } absolute top-0 left-1/2 -translate-x-1/2 bg-white p-12 rounded-lg shadow-xl`}
      >
        <h1 className="mb-6 text-2xl font-bold text-center">
          Restaurant Settings
        </h1>
        <RxCross2
          onClick={() => setSettings(false)}
          className="absolute top-2 right-2 text-xl cursor-pointer"
        />
        <form className="flex flex-col gap-4" action="">
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="">
              Show menu with Images
            </label>
            <input className="accent-mainColor" type="checkbox" />
          </section>
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="">
              Delivery Options
            </label>
            <input className="accent-mainColor" type="checkbox" />
          </section>
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="number"
            placeholder="Delivery time in minutes"
          />
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="">
              Dinein Options
            </label>
            <input className="accent-mainColor" type="checkbox" />
          </section>
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="">
              Pickup Options
            </label>
            <input className="accent-mainColor" type="checkbox" />
          </section>
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="number"
            placeholder="Delivery time in minutes"
          />
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="">
              Vat Applicable
            </label>
            <input className="accent-mainColor" type="checkbox" />
          </section>
          <button className="w-full py-2 bg-mainColor rounded-lg text-white">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditMenu;
