import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo1.png";
import { featuresData, solutionsData } from "../../data/data";
import Masonry from "react-layout-masonry";
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import { useMenuContext } from "../../context/menuContext";

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

const ListItems = ({
  className,
  item,
  setFeatures,
  setSolutions,
  location,
  setMenu,
}) => {
  return (
    <li
      onClick={() => {
        setMenu(false);
      }}
      onMouseEnter={() =>
        item === "Features"
          ? setFeatures(true)
          : item === "Solutions"
          ? setSolutions(true)
          : null
      }
      onMouseLeave={() =>
        item === "Features"
          ? setFeatures(false)
          : item === "Solutions"
          ? setSolutions(false)
          : null
      }
      className={`${className} hover:bg-hoverColor py-3 px-5 rounded-md transition duration-100 ease-linear cursor-pointer`}
    >
      {" "}
      <AnchorLink href={location}>
        <span>{item}</span>{" "}
      </AnchorLink>
    </li>
  );
};

const Nav = () => {
  const { showMenuItems, toggleMenuItems } = useMenuContext();
  const [menu, setMenu] = useState(false);
  const [features, setFeatures] = useState(false);
  const [solutions, setSolutions] = useState(false);
  const [navStyle, setNavStyle] = useState({
    backgroundColor: "transparent",
    boxShadow: "none",
  });
  const [windowWidth, setWindowWidth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setNavStyle({
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        });
      } else {
        setNavStyle({
          backgroundColor: "transparent",
          boxShadow: "none",
        });
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsLoggedIn(true);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = () => {
    const accessToken = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken")
    window.location.reload();
  }

  return (
    <nav className="w-full sticky lg:py-0 top-0 z-50" style={navStyle}>
      <section className="w-11/12 mx-auto py-5 flex justify-between lg:gap-16 items-center font-medium">
        <Link to="/">
          <img
            onClick={() => toggleMenuItems(false)}
            className="w-14"
            src={logo}
            alt=""
          />
        </Link>
        <section
          style={{ transition: "0.5s ease" }}
          className={`w-full xs:w-4/6 sm:w-1/3 lg:w-full h-dvh lg:h-auto pt-4 lg:pt-0 flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between absolute lg:static top-0 ${
            menu ? "left-0" : "-left-full"
          } bg-white lg:bg-transparent shadow-lg lg:shadow-none z-10`}
        >
          <RxCross2
            onClick={() => setMenu(false)}
            className="absolute right-5 top-9 text-xl lg:hidden"
          />
          <section className="px-10 lg:hidden">
            <Link to="/">
              <AnchorLink href="#header">
                <img
                  onClick={() => {
                    toggleMenuItems(false);
                    setMenu(false);
                  }}
                  className="w-20"
                  src={logo1}
                  alt=""
                />
              </AnchorLink>
            </Link>
          </section>

          {/* menu items  */}
          <ul
            className={`${
              showMenuItems ? "hidden" : "flex"
            } flex-col lg:flex-row gap-0 xl:gap-8 px-5 lg:px-0`}
          >
            <ListItems
              setMenu={setMenu}
              setFeatures={setFeatures}
              item="Features"
              location="#features"
            />
            <ListItems
              setMenu={setMenu}
              setSolutions={setSolutions}
              item="Solutions"
              location="#solutions"
            />
            <ListItems setMenu={setMenu} item="Pricing" location="#plans" />
            <ListItems setMenu={setMenu} item="About Us" location="#footer" />
            <ListItems
              setMenu={setMenu}
              item="Contact Us"
              location="#contact"
            />
          </ul>

          {isLoggedIn ? (
            <ul
              className={`${
                showMenuItems ? "hidden" : "flex"
              } flex-col lg:flex-row items-start gap-4 lg:gap-8 px-4 py-4 lg:py-0 lg:px-0`}
            >
              <Link to="/profile" onClick={() => toggleMenuItems(true)}>
                <li
                  onClick={() => setMenu(false)}
                  className="hover:bg-hoverColor py-3 px-5 rounded-md transition duration-100 ease-linear cursor-pointer"
                >
                  Profile
                </li>
              </Link>
                <button onClick={logout} className="w-full lg:w-auto px-5 py-3 bg-mainColor hover:bg-buttonHoverColor rounded-md shadow-lg hover:shadow-xl text-white transition duration-100 ease-linear">
                  Logout
                </button>
            </ul>
          ) : (
            <ul
              className={`${
                showMenuItems ? "hidden" : "flex"
              } flex-col lg:flex-row items-start gap-4 lg:gap-8 px-4 py-4 lg:py-0 lg:px-0`}
            >
              <Link to="/login" onClick={() => toggleMenuItems(true)}>
                <li
                  onClick={() => setMenu(false)}
                  className="hover:bg-hoverColor py-3 px-5 border lg:border-0 border-mainColor rounded-md transition duration-100 ease-linear cursor-pointer"
                >
                  Sign in
                </li>
              </Link>
              <Link to="/register" onClick={() => toggleMenuItems(true)}>
                <button className="w-full lg:w-auto px-5 py-3 bg-mainColor hover:bg-buttonHoverColor rounded-md shadow-lg hover:shadow-xl text-white transition duration-100 ease-linear">
                  Get Started
                </button>
              </Link>
            </ul>
          )}
        </section>
        <BiMenuAltRight
          onClick={() => setMenu(true)}
          className={`${showMenuItems ? "hidden" : "block"} lg:hidden text-2xl`}
        />
      </section>

      {/* features */}
      <section
        className={`w-5/6 absolute top-24 left-24 px-20 py-12 rounded-xl bg-white shadow-2xl ${
          !(windowWidth < 1024) && features ? "block" : "hidden"
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
        className={` w-3/5 absolute top-24 left-36 px-20 py-12 rounded-xl bg-white shadow-2xl ${
          !(windowWidth < 1024) && solutions ? "block" : "hidden"
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
