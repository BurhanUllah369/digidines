import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { useRestaurantDetailsContext } from "../../context/restaurantDetailsContext";
import EditMenu from "./EditMenu";
import Orders from "./Orders";
import OrdersReports from "./OrdersReport";
import RatingsAndComments from "./RatingsAndComments";

const NavItem = ({ linkName, icon, onClick, active, id }) => {
  return (
    <li
      id={id}
      onClick={onClick}
      className={`w-full flex justify-center items-center gap-2 py-2 rounded-3xl ${
        active ? "bg-mainColor text-white" : ""
      } text-sm cursor-pointer`}
    >
      <span>{icon}</span>
      <span>{linkName}</span>
    </li>
  );
};

const RestaurantDetails = () => {
  const [activeLink, setActiveLink] = useState("Edit Menu");
  const { sideMenu, toggleSection } = useRestaurantDetailsContext();

  const handleClick = (linkName, id) => {
    setActiveLink(linkName);
    toggleSection(id);
    console.log(id);
  };

  return (
    <div className="bg-gray-100 h-[90vh] pt-12">
      <nav>
        <ul className={`${sideMenu ? "w-1/3" : "w-2/3"} mx-auto flex justify-between bg-white rounded-3xl`}>
          <NavItem
            onClick={() => handleClick("Edit Menu", 1)}
            icon={<MdEdit />}
            linkName="Edit Menu"
            active={activeLink === "Edit Menu"}
            id={1}
          />
          <NavItem
            onClick={() => handleClick("Orders", 2)}
            icon={<FaClipboardList />}
            linkName="Orders"
            active={activeLink === "Orders"}
            id={2}
          />
          <NavItem
            onClick={() => handleClick("Orders Report", 3)}
            icon={<TbReportAnalytics />}
            linkName="Orders Report"
            active={activeLink === "Orders Report"}
            id={3}
          />
          <NavItem
            onClick={() => handleClick("Rating and Comments", 4)}
            icon={<FaStar />}
            linkName="Rating and Comments"
            active={activeLink === "Rating and Comments"}
            id={4}
          />
        </ul>
      </nav>
      <EditMenu />
      <Orders />
      <OrdersReports />
      <RatingsAndComments />
    </div>
  );
};

export default RestaurantDetails;
