import React, { useState, useEffect } from "react";
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
import { FaQrcode } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";

const NavItem = ({ linkName, icon, onClick, active, id }) => {
  return (
    <li
      id={id}
      onClick={onClick}
      className={`flex items-center justify-center gap-1 rounded-3xl bg-gray-100 py-2 sm:gap-2 md:bg-none ${
        active ? "bg-mainColor text-white" : ""
      } cursor-pointer text-xs sm:text-sm`}
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
  const { selectedRestaurant } = useRestaurantsPathsContext();
  const [activeColor, setActiveColor] = useState(""); // State to track the active color button

  const handleColorButtonClick = (color) => {
    setActiveColor(color); // Set the active color button
  };

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }

    const handleWindowReload = () => {
      localStorage.removeItem("activeLink");
    };

    window.addEventListener("beforeunload", handleWindowReload);

    return () => {
      window.removeEventListener("beforeunload", handleWindowReload);
    };
  }, []);

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId === selectedMenu ? null : menuId);
  };

  const handleClick = (linkName, id) => {
    setActiveLink(linkName);
    localStorage.setItem("activeLink", linkName);
    toggleRestaurantSection(id);
  };

  const handleDelCoupon = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Coupon?",
    );
    if (isConfirmed) {
      alert("Coupon deleted!");
    }
  };

  return (
    <div
      className={`${
        showSection === 1 ? "block" : "hidden"
      }  relative w-full pb-32`}
    >
      <section
        className={`mx-auto mt-12 w-11/12 lg:w-2/3 ${
          editRestaurant || coupon || settings ? "opacity-20" : "opacity-100"
        }`}
      >
        <section className="mb-6 flex items-center justify-between">
          <Link to={`/r`} className="flex items-center gap-2 text-sm">
            <FaArrowLeftLong className="cursor-pointer" />
            <span>Back</span>
          </Link>

          <section className="flex gap-5">
            <Link
              to={`/r/${selectedRestaurant}/qr-code`}
              className="flex items-center gap-2"
            >
              <p className="text-sm font-bold">QR Code</p>
              <FaQrcode />
            </Link>
            <Link
              to={`/r/${selectedRestaurant}/support`}
              className="flex items-center gap-2"
            >
              <p className="text-sm font-bold">Support</p>
              <MdOutlineSupportAgent />
            </Link>
          </section>
        </section>
        <section className="relative">
          <div className="relative h-48 w-full">
            <img
              className="h-full w-full rounded-lg object-cover"
              src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/add-product-2.jpg"
              alt=""
            />
            <div className="absolute inset-0 rounded-lg bg-black opacity-30"></div>
          </div>
          <img
            className="absolute bottom-0 left-0 w-32 rounded-full"
            src="https://img.freepik.com/premium-vector/restaurant-logo-design-template_79169-56.jpg?w=360"
            alt=""
          />
        </section>

        <section className="my-6">
          <section className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Cheezious</h1>
            <section className="flex gap-4 text-xl">
              <MdEdit
                onClick={() => setEditRestaurant(true)}
                className="cursor-pointer text-mainColor"
              />
              <IoIosSettings
                onClick={() => setSettings(true)}
                className="cursor-pointer text-mainColor"
              />
              <FaGift
                onClick={() => setCoupon(true)}
                className="cursor-pointer text-mainColor"
              />
            </section>
          </section>
          <p className="mt-4 flex items-center gap-2">
            <FaWifi className="text-mainColor" />
            <span>1234534</span>
          </p>
          <p className="my-2 flex items-center gap-2">
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
            className={`grid grid-cols-2 gap-4 rounded-3xl md:grid-cols-3 md:bg-gray-100`}
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
        className={`mx-auto w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/3 ${
          editRestaurant ? "block" : "hidden"
        } absolute left-1/2 top-0 -translate-x-1/2 rounded-lg bg-white px-4 py-12 shadow-xl sm:p-12`}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Edit Restaurant Data
        </h1>
        <RxCross2
          onClick={() => setEditRestaurant(false)}
          className="absolute right-2 top-2 cursor-pointer text-xl"
        />
        <form className="flex flex-col gap-4" action="">
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Name"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Placeholder"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Description"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Wifi Password"
          />
          <label className="text-lg font-bold">Restaurant Image</label>
          <input type="file" accept="image/*" />
          <label className="text-lg font-bold">Restaurant Logo</label>
          <input type="file" accept="image/*" />
          <button className="w-full rounded-lg bg-mainColor py-2 text-white">
            Submit
          </button>
        </form>
      </section>

      {/* coupon  */}

      <section
        className={`${
          coupon ? "block" : "hidden"
        } absolute left-1/2 top-0 w-11/12 -translate-x-1/2 bg-white p-8 shadow-lg sm:w-5/6 md:w-3/5 lg:w-1/3`}
      >
        <h1 className="mb-4 border-b pb-3 text-2xl font-bold">Coupons</h1>
        <RxCross2
          onClick={() => setCoupon(false)}
          className="absolute right-2 top-2 cursor-pointer text-xl"
        />
        <section>
          <section className="flex items-center justify-between">
            <h2 className="mb-3 mt-4 text-xl font-bold">Coupon Details</h2>
            <section className="flex gap-2 text-lg">
              <MdEdit
                onClick={() => setCouponEdit(true)}
                className="cursor-pointer text-green-600"
              />
              <MdDelete
                onClick={handleDelCoupon}
                className="cursor-pointer text-red-600"
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
          } absolute left-0 top-0 w-full bg-gray-100 px-4 py-12 shadow-lg xs:p-12`}
        >
          <h1 className="text-2xl font-bold">Create Coupon</h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            action=""
            className="mt-4 flex flex-col gap-3"
          >
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              type="number"
              placeholder="Discount Percentage (1% - 100%)"
            />
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              type="number"
              placeholder="Number of Orders Required"
            />
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              type="number"
              placeholder="Minimum Order price"
            />
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
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
                className="w-full rounded-lg bg-headerBg py-2 text-white"
              >
                Back
              </button>
              <button className="w-full rounded-lg bg-mainColor py-2 text-white">
                Create
              </button>
            </section>
          </form>
        </section>
      </section>

      {/* restaurant settings  */}
      <section
        className={`mx-auto w-11/12 sm:w-5/6 md:w-3/5 lg:w-1/3 ${
          settings ? "block" : "hidden"
        } absolute left-1/2 top-0 -translate-x-1/2 rounded-lg bg-white px-4 py-12 shadow-xl sm:p-12`}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Restaurant Settings
        </h1>
        <RxCross2
          onClick={() => setSettings(false)}
          className="absolute right-2 top-2 cursor-pointer text-xl"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
          action=""
        >
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
            className="rounded-lg border px-3 py-2 text-sm outline-none"
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
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="number"
            placeholder="Delivery time in minutes"
          />
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="vat">
              Vat Applicable
            </label>
            <input className="accent-mainColor" type="checkbox" id="vat" />
          </section>
          <p>Select color of your menu</p>
          <div className="flex justify-evenly">
            <button
              className={`h-8 w-8 rounded-full ${
                activeColor === "mainColor" ? "border-4 border-black" : ""
              } bg-mainColor`}
              onClick={() => handleColorButtonClick("mainColor")}
            ></button>
            <button
              className={`h-8 w-8 rounded-full ${
                activeColor === "green" ? "border-4 border-black" : ""
              } bg-green-500`}
              onClick={() => handleColorButtonClick("green")}
            ></button>
            <button
              className={`h-8 w-8 rounded-full ${
                activeColor === "red" ? "border-4 border-black" : ""
              } bg-red-600`}
              onClick={() => handleColorButtonClick("red")}
            ></button>
            <button
              className={`h-8 w-8 rounded-full ${
                activeColor === "orange" ? "border-4 border-black" : ""
              } bg-orange-500`}
              onClick={() => handleColorButtonClick("orange")}
            ></button>
            <button
              className={`h-8 w-8 rounded-full ${
                activeColor === "yellow" ? "border-4 border-black" : ""
              } bg-yellow-500`}
              onClick={() => handleColorButtonClick("yellow")}
            ></button>
            <button
              className={`h-8 w-8 rounded-full ${
                activeColor === "blue" ? "border-4 border-black" : ""
              } bg-blue-500`}
              onClick={() => handleColorButtonClick("blue")}
            ></button>
          </div>
          <button
            onClick={() => setSettings(false)}
            className="w-full rounded-lg bg-mainColor py-2 text-white"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditMenu;
