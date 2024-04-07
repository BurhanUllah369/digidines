import React, { useContext, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { FaPowerOff } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSideMenuContext } from "../../../context/sideMenuContext";

const TopNav = () => {
  const [details, setDetails] = useState(false);
  const { sideMenu, toggleSideMenu } = useSideMenuContext();

  return (
    <nav style={{transition: "0.5s ease"}} className={`${sideMenu ? "w-full lg:w-3/5 xl:w-3/4" : "w-full"} ml-auto shadow-xl`}>
      <section className="h-20 px-6 flex justify-between items-center relative">
        <button onClick={() => toggleSideMenu()}>
          <BiMenuAltLeft className="text-3xl text-mainColor" />
        </button>
        <img
          onClick={() => setDetails((pre) => !pre)}
          className="w-10 h-10 rounded-full cursor-pointer"
          src="https://slidesigma.com/themes/html/foodtech/assets/img/foodtech/customer-6.jpg"
          alt=""
        />
        <ul
          style={{ transition: "0.3s ease" }}
          className={`absolute ${
            details ? "top-20" : "-top-48"
          } right-4 bg-white border p-5 rounded-sm`}
        >
          <li className="pb-3">
            <h1 className="text-xl font-bold text-gray-500">Welcome, Anna</h1>
          </li>
          <hr />
          <li className="py-3">
            <Link className="flex items-center gap-4">
              <CiUser />
              <span>Profile</span>
            </Link>
          </li>
          <li className="py-3">
            <Link className="flex items-center gap-4">
              <FaPowerOff />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default TopNav;
