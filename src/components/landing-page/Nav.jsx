import React, { useState } from "react";
import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo1.png";
import { featuresData, solutionsData } from "../../data/data";
import Masonry from "react-layout-masonry";
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const Item = ({ icon, heading, description }) => {
  return (
    <section className="flex items-center gap-6">
      <span className="text-xl text-mainColor">{icon}</span>
      <section>
        <h1 className="text-lg font-semibold">{heading}</h1>
        <p className="text-xs text-gray-500">{description}</p>
      </section>
    </section>
  );
};

const ListItems = ({ className, item, setFeatures, setSolutions }) => {
  return (
    <li
      onMouseEnter={() =>
        item == "Features"
          ? setFeatures(true)
          : item == "Solutions"
          ? setSolutions(true)
          : null
      }
      onMouseLeave={() =>
        item == "Features"
          ? setFeatures(false)
          : item == "Solutions"
          ? setSolutions(false)
          : null
      }
      className={`${className} hover:bg-hoverColor py-3 px-5 rounded-md transition duration-100 ease-linear cursor-pointer`}
    >
      <a className="features" href="#">
        {item}
      </a>
    </li>
  );
};

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [features, setFeatures] = useState(false);
  const [solutions, setSolutions] = useState(false);

  return (
    <nav className="w-full relative py-3">
      <section className="w-11/12 mx-auto flex justify-between lg:gap-16 items-center font-medium">
        <img className="w-20" src={logo} alt="" />
        <section
          style={{ transition: "0.5s ease" }}
          className={`w-full xs:w-4/6 sm:w-1/3 lg:w-full h-dvh lg:h-auto py-8 flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between absolute lg:static top-0 ${
            menu ? "left-0" : "-left-full"
          } bg-white lg:bg-transparent shadow-lg lg:shadow-none z-10`}
        >
          <RxCross2
            onClick={() => setMenu(false)}
            className="absolute right-5 top-9 text-xl lg:hidden"
          />
          <section className="px-10 lg:hidden">
            <img className="w-20" src={logo1} alt="" />
          </section>
          <ul className="flex flex-col lg:flex-row gap-0 xl:gap-8 px-5 lg:px-0">
            <ListItems setFeatures={setFeatures} item="Features" />
            <ListItems setSolutions={setSolutions} item="Solutions" />
            <ListItems item="Pricing" />
            <ListItems item="About Us" />
            <ListItems item="Contact Us" />
          </ul>
          <ul className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8 px-4 lg:px-0">
            <ListItems
              className="border lg:border-0 border-mainColor w-full lg:w-auto flex justify-center"
              item="Sign in"
            />
            <button className="w-full lg:w-auto px-5 py-3 bg-mainColor hover:bg-buttonHoverColor rounded-md shadow-lg hover:shadow-xl text-white transition duration-100 ease-linear">
              Get Started
            </button>
          </ul>
        </section>
        <BiMenuAltRight
          onClick={() => setMenu(true)}
          className="block lg:hidden text-2xl"
        />
      </section>

      {/* features */}
      <section
        className={`w-5/6 absolute top-24 left-24 px-20 py-12 rounded-xl bg-gray-100 shadow-2xl ${
          features ? "block" : "hidden"
        } z-10`}
      >
        <Masonry columns={3} gap={40}>
          {Object.keys(featuresData).map((key) => (
            <Item
              key={key}
              icon={featuresData[key].icon}
              heading={featuresData[key].heading}
              description={featuresData[key].description}
            />
          ))}
        </Masonry>
      </section>

      {/* solutions  */}
      <section
        className={`w-3/5 absolute top-24 left-36 px-20 py-12 rounded-xl bg-gray-100 shadow-2xl ${
          solutions ? "block" : "hidden"
        } z-10`}
      >
        <Masonry columns={3} gap={40}>
          {Object.keys(solutionsData).map((key) => (
            <Item
              key={key}
              icon={solutionsData[key].icon}
              heading={solutionsData[key].heading}
              description={solutionsData[key].description}
            />
          ))}
        </Masonry>
      </section>
    </nav>
  );
};

export default Nav;
