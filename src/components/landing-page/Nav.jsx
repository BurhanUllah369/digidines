import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo1.png";
import { featuresData, solutionsData } from "../../data/data";
import Masonry from "react-layout-masonry";
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link, useNavigate } from "react-router-dom";

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
      className={`${className} cursor-pointer rounded-md px-5 py-3 transition duration-100 ease-linear hover:bg-hoverColor`}
    >
      <AnchorLink href={location}>
        <span>{item}</span>
      </AnchorLink>
    </li>
  );
};

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [features, setFeatures] = useState(false);
  const [solutions, setSolutions] = useState(false);
  const [navStyle, setNavStyle] = useState({
    backgroundColor: "transparent",
    boxShadow: "none",
  });
  const [windowWidth, setWindowWidth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [changeNavBar, setChangeNavbar] = useState(false);
  const [menuItems, setmenuItems] = useState(false);
  const navigate = useNavigate();

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

    if (location.pathname.includes("/r")) {
      setChangeNavbar(true);
    } else {
      setChangeNavbar(false);
    }

    if(location.pathname.includes("/register") || location.pathname.includes("/login") || location.pathname.includes("/profile")) {
      setmenuItems(true)
    } else {
      setmenuItems(false)
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  const logout = () => {
    const accessToken = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    window.location.reload();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full lg:py-0" style={navStyle}>
      <section className="mx-auto flex w-11/12 items-center justify-between py-5 font-medium lg:gap-16">
        <Link
          to="/"
          
        >
          <img
            className="w-14"
            src={logo}
            alt=""
          />
        </Link>
        <section
          style={{ transition: "0.5s ease" }}
          className={`absolute top-0 flex h-dvh w-full flex-col justify-between pt-4 xs:w-4/6 sm:w-1/3 lg:static lg:h-auto lg:w-full lg:flex-row  lg:pt-0 ${
            menu ? "left-0" : "-left-full"
          } z-10 bg-white shadow-2xl lg:bg-transparent lg:shadow-none`}
        >
          <RxCross2
            onClick={() => setMenu(false)}
            className="absolute right-5 top-9 text-xl lg:hidden"
          />
          <section className="px-10 lg:hidden">
            <Link
              to="/"
              onClick={() => {
                setMenu(false);
              }}
            >
              <img className="w-20" src={logo1} alt="" />
            </Link>
          </section>

          {/* menu items  */}
          {changeNavBar ? (
            <ul
              className={`${
                menuItems ? "hidden" : "flex"
              } flex-col gap-0 px-5 lg:flex-row lg:px-0 xl:gap-8`}
            >
              <ListItems setMenu={setMenu} item="Restaurants" />
              <ListItems setMenu={setMenu} item="Orders" />
              <ListItems setMenu={setMenu} item="Invoice" />
              <ListItems setMenu={setMenu} item="Customers" />
            </ul>
          ) : (
            <ul
              className={`${
                menuItems ? "hidden" : "flex"
              } flex-col gap-0 px-5 lg:flex-row lg:px-0 xl:gap-8`}
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
          )}

          {isLoggedIn ? (
            <ul
              className={`${
                menuItems ? "hidden" : "flex"
              } flex-col items-start gap-4 px-4 py-4 lg:flex-row lg:gap-4 lg:px-0 lg:py-0`}
            >
              <Link to="/r">
                <li
                  onClick={() => setMenu(false)}
                  className="cursor-pointer rounded-md px-5 py-3 transition duration-100 ease-linear hover:bg-hoverColor"
                >
                  Restaurants
                </li>
              </Link>
              <Link to="/profile">
                <li
                  onClick={() => setMenu(false)}
                  className="cursor-pointer rounded-md px-5 py-3 transition duration-100 ease-linear hover:bg-hoverColor"
                >
                  Profile
                </li>
              </Link>
              <Link onClick={logout}>
                <li
                  onClick={() => setMenu(false)}
                  className="cursor-pointer rounded-md bg-red-600 px-5 py-3 text-white transition duration-100 ease-linear hover:bg-red-500"
                >
                  Logout
                </li>
              </Link>

              {/* profile section  */}
              {/* <img
                onClick={() => setDetails((pre) => !pre)}
                className="h-10 w-10 cursor-pointer rounded-full"
                src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                alt=""
              />
              <ul
                style={{ transition: "0.3s ease" }}
                className={`absolute ${
                  details ? "top-20" : "-top-48"
                } right-4 rounded-sm border bg-white p-5`}
              >
                <li className="pb-3">
                  <h1 className="text-xl font-bold text-gray-500">
                    Welcome, Anna
                  </h1>
                </li>
                <hr />
                <li className="py-3" onClick={() => setDetails(false)}>
                  <Link to={"/profile"} className="flex items-center gap-4">
                    <CiUser />
                    <span>Profile</span>
                  </Link>
                </li>
                <li className="py-3" onClick={() => setDetails(false)}>
                  <Link onClick={logout} className="flex items-center gap-4">
                    <FaPowerOff />
                    <span>Logout</span>
                  </Link>
                </li>
              </ul> */}
            </ul>
          ) : (
            <ul
              className={`${
                menuItems ? "hidden" : "flex"
              } flex-col items-start gap-4 px-4 py-4 lg:flex-row lg:gap-8 lg:px-0 lg:py-0`}
            >
              <Link to="/login">
                <li
                  onClick={() => setMenu(false)}
                  className="cursor-pointer rounded-md border border-mainColor px-5 py-3 transition duration-100 ease-linear hover:bg-hoverColor lg:border-0"
                >
                  Sign in
                </li>
              </Link>
              <Link to="/register">
                <button className="w-full rounded-md bg-mainColor px-5 py-3 text-white shadow-lg transition duration-100 ease-linear hover:bg-buttonHoverColor hover:shadow-xl lg:w-auto">
                  Get Started
                </button>
              </Link>
            </ul>
          )}
        </section>
        <BiMenuAltRight
          onClick={() => setMenu(true)}
          className={`${menuItems ? "hidden" : "block"} text-2xl lg:hidden`}
        />
      </section>

      {/* features */}
      <section
        className={`absolute left-24 top-24 w-5/6 rounded-xl bg-white px-20 py-12 shadow-2xl ${
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
        className={` absolute left-36 top-24 w-3/5 rounded-xl bg-white px-20 py-12 shadow-2xl ${
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
