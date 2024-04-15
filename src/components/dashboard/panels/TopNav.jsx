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
        
      </section>
    </nav>
  );
};

export default TopNav;
