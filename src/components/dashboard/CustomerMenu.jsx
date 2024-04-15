import React from "react";
import { FaArrowLeftLong, FaWifi } from "react-icons/fa6";
import { MdEdit, MdOutlineDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import { IoLocation } from "react-icons/io5";
import { useProductDetailsContext } from "../../context/productDetailsContext";
import { FaShoppingCart } from "react-icons/fa";

const menuItems = [
  {
    name: "Grilled Chicken Sandwich",
    imageUrl:
      "https://images.pexels.com/photos/54255/pexels-photo-54255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    price: 20,
    mostSelling: true,
    variations: false,
  },
  {
    name: "Chicken Alfredo Pasta",
    imageUrl:
      "https://images.pexels.com/photos/842519/pexels-photo-842519.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    price: 20,
    mostSelling: false,
    variations: true,
  },
  {
    name: "Sushi Platter",
    imageUrl:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    price: 20,
    mostSelling: true,
    variations: true,
  },
  {
    name: "Tandoori Chicken",
    imageUrl:
      "https://images.pexels.com/photos/236781/pexels-photo-236781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    price: 20,
    mostSelling: false,
    variations: false,
  },
];

const Menu = () => {
  return (
    <section className="rounded-lg border pb-3 transition duration-150 ease-linear hover:shadow-customShadow">
      <img
        src="https://img.freepik.com/premium-vector/digital-restaurant-menu-horizontal-format_23-2148655475.jpg?w=360"
        alt=""
        className="w-60 rounded-lg"
      />
      <h2 className="mt-3 text-center text-2xl font-bold">Menu 1</h2>
    </section>
  );
};

const MenuItem = ({ menuItem }) => {
  const { setSelectedProductName } = useProductDetailsContext(); // Get the setSelectedProductName function from the context
  const { selectedRestaurant } = useRestaurantsPathsContext();

  const handleItemClick = () => {
    const formattedName = menuItem.name.toLowerCase().replace(/\s+/g, "-"); // Convert name to lowercase and replace spaces with hyphens
    setSelectedProductName(menuItem); // Set the selected product name when the item is clicked
  };

  const formattedName = menuItem.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      to={`/menus/${selectedRestaurant}/${formattedName}`}
      onClick={handleItemClick}
    >
      {/* Navigate to the product details page and call handleItemClick when clicked */}
      <section className="relative flex h-32 cursor-pointer items-center rounded-lg border transition duration-150 ease-linear hover:shadow-customShadow">
        <img
          className="block h-full w-40 rounded-l object-cover"
          src={menuItem.imageUrl}
          alt=""
        />
        <section className="w-full p-3 xs:p-4">
          <section className="flex items-center justify-between gap-3 text-lg font-bold">
            <section className="flex flex-col gap-2">
              <h1>{menuItem.name}</h1>
              <p className="text-sm font-normal text-gray-500">
                This is description
              </p>
            </section>
            <section className="flex items-center gap-3">
              {menuItem.variations ? (
                <p className="text-sm font-medium text-gray-500">Starting at</p>
              ) : null}
              <p className="rounded-lg bg-orange-400 p-1 text-base  text-white">
                ${menuItem.price}
              </p>
            </section>
          </section>
          {menuItem.mostSelling ? (
            <p className="absolute right-1 top-1 rounded-lg bg-green-500 p-1 text-xs font-semibold text-white">
              Most Selling
            </p>
          ) : null}
        </section>
      </section>
    </Link>
  );
};

const CustomerMenu = () => {
  const { selectedRestaurant } = useRestaurantsPathsContext();
  return (
    <section className={`mx-auto mt-12 w-11/12 lg:w-2/3`}>
      <section className="mb-6 flex items-center justify-between">
        <Link to={`/r`} className="flex items-center gap-2 text-sm">
          <FaArrowLeftLong className="cursor-pointer" />
          <span>Back</span>
        </Link>
        <Link
          to={`/menus/${selectedRestaurant}/cart`}
          className="flex items-center gap-2 font-bold"
        >
          <span>Cart</span>
          <FaShoppingCart />
          <span></span>
        </Link>
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

      {/* menu  */}
      <h1 className="my-4 text-xl font-bold xs:text-3xl"> Menus</h1>
      <section className="mb-12 flex gap-4">
        <Menu />
        <Menu />
      </section>
      <hr />

      {/* menu items  */}
      <h1 className="mt-12 text-xl font-bold xs:text-3xl"> Menu Items</h1>
      <section className="my-12 grid gap-6">
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            menuItem={menuItem}
          />
        ))}
      </section>
    </section>
  );
};

export default CustomerMenu;
