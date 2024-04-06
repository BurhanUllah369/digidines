import React, { useEffect } from 'react';
import logo from "../../../assets/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSideMenuContext } from '../../../context/sideMenuContext';
import { RxCross2 } from "react-icons/rx";

const ListItem = ({ icon, linkName, icon2, path, toggleSideMenu }) => {
  return (
    <li onClick={toggleSideMenu} className='py-4 px-8 flex items-center gap-4'>
      <p className=''>{icon}</p>
      <Link to={path}>{linkName}</Link>
      <p className='ml-auto'>{icon2}</p>
    </li>
  );
};

const SideNav = () => {
  const { sideMenu, toggleSideMenu } = useSideMenuContext();

  return (
    <section
      className={`${sideMenu ? "left-0" : "-left-1/4"} w-5/6 xs:w-2/3 sm:w-2/5 xl:w-1/4 h-dvh absolute lg:fixed top-0 left-0 shadow-lg bg-white z-10`}
      style={{ transition: "0.5s ease" }}
    >
      <section className='h-20 flex justify-center items-center bg-gray-100'>
        <img className='w-16 block mx-auto' src={logo} alt="" />
      </section>
      <ul className=''>
        {/* <ListItem icon={<MdDashboard />} linkName="" path="/restaurants" toggleSideMenu={toggleSideMenu} /> */}
        <ListItem path="/restaurants" toggleSideMenu={toggleSideMenu} icon={<FaListCheck />} linkName="Restaurants List" />
        <ListItem icon={<FaBoxArchive />} linkName="Menus" icon2={<MdKeyboardArrowDown />} />
        <ListItem icon={<FaClipboardList />} linkName="Orders" />
        <ListItem icon={<FaFileInvoice />} linkName="Invoice" icon2={<MdKeyboardArrowDown />} />
        <ListItem icon={<HiUsers />} linkName="Customers" icon2={<MdKeyboardArrowDown />} />
      </ul>
      <button onClick={() => toggleSideMenu()} className='block lg:hidden absolute top-0 -right-3 bg-mainColor p-2 rounded'>
        <RxCross2 className='text-white' />
      </button>
    </section>
  );
};

export default SideNav;
