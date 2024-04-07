import React, { useState } from "react";
import { useRestaurantDetailsContext } from "../../context/restaurantDetailsContext";
import { FaWifi } from "react-icons/fa";
import { IoFastFoodSharp, IoListSharp, IoLocation } from "react-icons/io5";
import { MdDelete, MdOutlineDescription } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaGift } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaClipboardList } from "react-icons/fa6";
import Menus from "./Menus";
import AddOns from "./AddOns";
import Tables from "./Tables";
import { ImSpoonKnife } from "react-icons/im";
import { PiForkKnifeFill } from "react-icons/pi";
import { useEditRestaurantContext } from "../../context/editRestaurant";

const NavItem = ({ linkName, icon, onClick, active, id }) => {
  return (
    <li
      id={id}
      onClick={onClick}
      className={`flex justify-center items-center gap-1 sm:gap-2 py-2 rounded-3xl bg-gray-100 md:bg-none ${
        active ? "bg-mainColor text-white" : ""
      } text-xs sm:text-sm cursor-pointer`}
    >
      <span>{icon}</span>
      <span>{linkName}</span>
    </li>
  );
};

const EditMenu = () => {
  const { showSection } = useRestaurantDetailsContext();
  const { toggleRestaurantSection } = useEditRestaurantContext();
  const [editRestaurant, setEditRestaurant] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [settings, setSettings] = useState(false);
  const [couponEdit, setCouponEdit] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeLink, setActiveLink] = useState("Menu");

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId === selectedMenu ? null : menuId);
  };

  const handleClick = (linkName, id) => {
    setActiveLink(linkName);
    toggleRestaurantSection(id);
  };

  const handleDelCoupon = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Coupon?"
    );
    if (isConfirmed) {
      // Perform delete operation here
      alert("Coupon deleted!");
    }
  };

  return (
    <div
      className={`${
        showSection === 1 ? "block" : "hidden"
      }  w-full relative pb-32`}
    >
      <section
        className={`w-11/12 lg:w-2/3 mx-auto mt-12 ${
          editRestaurant || coupon || settings ? "opacity-20" : "opacity-100"
        }`}
      >
        <Link
          to="/restaurants"
          className="mb-4 flex items-center gap-2 text-sm"
        >
          <FaArrowLeftLong className="cursor-pointer" />
          <span>Back</span>
        </Link>
        <section className="relative">
          <div className="w-full h-48 relative">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/add-product-2.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
          </div>
          <img
            className="w-32 absolute bottom-0 left-0 rounded-full"
            src="https://img.freepik.com/premium-vector/restaurant-logo-design-template_79169-56.jpg?w=360"
            alt=""
          />
        </section>

        <section className="my-6">
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

        <hr />

        {/* Navbar  */}

        <nav className="mt-12">
          <ul
            className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:bg-gray-100 rounded-3xl`}
          >
            <NavItem
              onClick={() => handleClick("Menu", 1)}
              icon={<ImSpoonKnife />}
              linkName="Menu"
              active={activeLink === "Menu"}
              id={1}
            />
            <NavItem
              onClick={() => handleClick("AddOns", 2)}
              icon={<PiForkKnifeFill />}
              linkName="AddOns"
              active={activeLink === "AddOns"}
              id={2}
            />
            <NavItem
              onClick={() => handleClick("Tables", 3)}
              icon={<IoFastFoodSharp />}
              linkName="Tables"
              active={activeLink === "Tables"}
              id={3}
            />
          </ul>
        </nav>

        <Menus />
        <AddOns />
        <Tables />
      </section>

      {/* edit restaurant  */}
      <section
        className={`w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/3 mx-auto ${
          editRestaurant ? "block" : "hidden"
        } absolute top-0 left-1/2 -translate-x-1/2 bg-white px-4 py-12 sm:p-12 rounded-lg shadow-xl`}
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
        } w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/3 absolute top-0 left-1/2 -translate-x-1/2 bg-white p-8 shadow-lg`}
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
              <MdEdit
                onClick={() => setCouponEdit(true)}
                className="text-green-600 cursor-pointer"
              />
              <MdDelete
                onClick={handleDelCoupon}
                className="text-red-600 cursor-pointer"
              />
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

        {/* edit and create coupon  */}
        <section
          className={`${
            couponEdit ? "block" : "hidden"
          } w-full absolute top-0 left-0 bg-gray-100 shadow-lg px-4 py-12 xs:p-12`}
        >
          <h1 className="text-2xl font-bold">Create Coupon</h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            action=""
            className="mt-4 flex flex-col gap-3"
          >
            <input
              className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
              type="number"
              placeholder="Discount Percentage (1% - 100%)"
            />
            <input
              className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
              type="number"
              placeholder="Number of Orders Required"
            />
            <input
              className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
              type="number"
              placeholder="Minimum Order price"
            />
            <input
              className="w-full py-2 px-3 outline-none border rounded-lg text-sm"
              type="number"
              placeholder="Expiration Duration (in days)"
            />
            <section className="mt-3 flex items-center gap-2">
              <label className="text-sm" htmlFor="isActive">
                Is Currently Active
              </label>
              <input
                id="isActive"
                className="accent-mainColor"
                type="checkbox"
              />
            </section>
            <section className="mt-4 flex gap-4">
              <button
                onClick={() => setCouponEdit(false)}
                className="w-full py-2 bg-headerBg rounded-lg text-white"
              >
                Back
              </button>
              <button className="w-full py-2 bg-mainColor rounded-lg text-white">
                Create
              </button>
            </section>
          </form>
        </section>
      </section>

      {/* restaurant settings  */}
      <section
        className={`w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/3 mx-auto ${
          settings ? "block" : "hidden"
        } absolute top-0 left-1/2 -translate-x-1/2 bg-white px-4 py-12 sm:p-12 rounded-lg shadow-xl`}
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
            <label className="text-sm" htmlFor="showImages">
              Show menu with Images
            </label>
            <input
              className="accent-mainColor"
              type="checkbox"
              id="showImages"
            />
          </section>
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="delivery">
              Delivery Options
            </label>
            <input className="accent-mainColor" type="checkbox" id="delivery" />
          </section>
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="number"
            placeholder="Delivery time in minutes"
          />
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="dinein">
              Dinein Options
            </label>
            <input className="accent-mainColor" type="checkbox" id="dinein" />
          </section>
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="pickup">
              Pickup Options
            </label>
            <input className="accent-mainColor" type="checkbox" id="pickup" />
          </section>
          <input
            className="py-2 px-3 outline-none border rounded-lg text-sm"
            type="number"
            placeholder="Delivery time in minutes"
          />
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="vat">
              Vat Applicable
            </label>
            <input className="accent-mainColor" type="checkbox" id="vat" />
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
