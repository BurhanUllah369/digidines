import React, { useState, useEffect } from "react";
import { useRestaurantDetailsContext } from "../../context/restaurantDetailsContext";
import { FaWifi } from "react-icons/fa";
import { IoFastFoodSharp, IoListSharp, IoLocation } from "react-icons/io5";
import { MdDelete, MdOutlineDescription } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosSettings, IoMdAddCircle } from "react-icons/io";
import { FaGift } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Menus from "./Menus";
import AddOns from "./AddOns";
import Tables from "./Tables";
import { ImSpoonKnife } from "react-icons/im";
import { PiForkKnifeFill } from "react-icons/pi";
import { useEditRestaurantContext } from "../../context/editRestaurant";
import { FaQrcode } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import { API_ENDPOINTS } from "../../api/api";
import axios from "axios";

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

const EditRestaurant = () => {
  const { showSection } = useRestaurantDetailsContext();
  const { toggleRestaurantSection } = useEditRestaurantContext();
  const [editRestaurant, setEditRestaurant] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [settings, setSettings] = useState(false);
  const [couponEdit, setCouponEdit] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeLink, setActiveLink] = useState("Menu");
  const { selectedRestaurantName, selectedRestaurantId } =
    useRestaurantsPathsContext();
  const [activeColor, setActiveColor] = useState("");
  const [restaurant, setRestaurant] = useState([]);
  const [getResError, setGetResErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponData, setCouponData] = useState([]);
  const [couponId, setCouponId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [couponAdd, setCouponAdd] = useState(false);

  const handleColorButtonClick = (color) => {
    setActiveColor(color);
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

  // delete coupon

  const handleDelCoupon = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Coupon?",
    );
    if (isConfirmed) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        axios
          .delete(`${API_ENDPOINTS.DELETE_COUPON}${couponId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setCouponData(
              couponData.filter((coupon) => coupon.id !== couponId),
            );
            setCouponId("");
            setSuccess("Coupon Deleted");
            setTimeout(() => {
              setSuccess("");
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
            setError("An error Occurred");
            setTimeout(() => {
              setError("");
            }, 2000);
          });
        setCoupon(false);
      }
    }
  };

  // get selected restaurant

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(
          `${API_ENDPOINTS.GET_RESTAURANT_BY_NAME}${selectedRestaurantName}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((response) => {
          setLoading(true);
          // console.log(response.data.qr_code.qr_link);
          // console.log(response.data)
          setRestaurant(response.data);
          localStorage.setItem("restaurantId", response.data.id);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(true);
          setGetResErr(error.response.statusText);
          // console.log(error.response.statusText);
          setLoading(false);
        });

      // get coupons

      axios
        .get(`${API_ENDPOINTS.GET_COUPONS}${selectedRestaurantId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setCouponId(response.data.length > 0 ? response.data[0].id : null);
          setCouponData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // loading

  if (loading) {
    return (
      <p className="mx-auto mt-24 h-10 w-10 animate-spin rounded-full border-2 border-mainColor border-r-white"></p>
    );
  }

  // update restaurant
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [wifi, setWifi] = useState("");
  const [description, setDescription] = useState("");
  const [resImage, setResImage] = useState("");
  const [resLogo, setResLogo] = useState("");

  const updateRestaurant = (e) => {
    e.preventDefault();
    setEditRestaurant(false);
    const resId = localStorage.getItem("restaurantId");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address || restaurant.address);
    formData.append("wifi_password", wifi || restaurant.wifi_password);
    formData.append("description", description || restaurant.description);

    if (resImage) {
      formData.append("image_restaurant", resImage);
    }
    if (resLogo) {
      formData.append("image_logo", resLogo);
    }

    const accessToken = localStorage.getItem("accessToken");
    // setLoading(true)
    axios
      .put(
        `${API_ENDPOINTS.UPDATE_RESTAURANT_DATA}${resId}/update/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        // console.log(response);
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // setLoading(false)
  };

  // add coupon

  const [addCouponDiscout, setAddCouponDiscout] = useState("");
  const [addCouponOrdersReq, setAddCouponOrdersReq] = useState("");
  const [addCouponOrderPrice, setAddCouponOrderPrice] = useState("");
  const [addCouponExpDate, setAddCouponExpDate] = useState("");
  const [addCouponActive, setAddCouponActive] = useState(true);

  const addCoupon = (e) => {
    e.preventDefault();

    if (addCouponDiscout > 100 || addCouponDiscout < 0) {
      setError("Discount percentage must be between 0 and 100");
      setTimeout(() => {
        setError("");
      }, 2000);
      setCouponAdd(false);
      setCoupon(false);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const couponData = {
      discount_percentage: addCouponDiscout,
      order_requirement: addCouponOrdersReq,
      minimum_order_price: addCouponOrderPrice,
      expiry_duration: addCouponExpDate,
      is_active: addCouponActive,
    };

    if (accessToken) {
      axios
        .post(
          `${API_ENDPOINTS.ADD_COUPON}${selectedRestaurantId}/coupons/`,
          couponData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((response) => {
          console.log(response.data);
          setCouponData((prevCouponData) => [...prevCouponData, response.data]);
          setSuccess("Coupon Created");
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setError("An Error Occurred");
          setTimeout(() => {
            setError("");
          }, 2000);
        });
      setCouponAdd(false);
      setCoupon(false);
    }
  };

  // update coupon
  const [editCouponDiscout, setEditCouponDiscout] = useState("");
  const [editCouponOrdersReq, setEditCouponOrdersReq] = useState("");
  const [editCouponOrderPrice, setEditCouponOrderPrice] = useState("");
  const [editCouponExpDate, setEditCouponExpDate] = useState("");
  const [editCouponActive, setEditCouponActive] = useState(true);

  useEffect(() => {
    if (couponData.length > 0) {
      setEditCouponDiscout(couponData[0]?.discount_percentage || "");
      setEditCouponOrdersReq(couponData[0]?.order_requirement || "");
      setEditCouponOrderPrice(couponData[0]?.minimum_order_price || "");
      setEditCouponExpDate(couponData[0]?.expiry_duration || "");
      setEditCouponActive(couponData[0]?.is_active || true);
    }
  }, [couponData]);

  const updateCoupon = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    const updatedCouponData = {
      discount_percentage: editCouponDiscout,
      order_requirement: editCouponOrdersReq,
      minimum_order_price: editCouponOrderPrice,
      expiry_duration: editCouponExpDate,
      is_active: editCouponActive,
    };

    axios
      .put(`${API_ENDPOINTS.UPDATE_COUPON}${couponId}/`, updatedCouponData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Coupon updated successfully:", response.data);
        // Update couponData with the updated data
        const updatedCouponIndex = couponData.findIndex(
          (coupon) => coupon.id === couponId,
        );
        if (updatedCouponIndex !== -1) {
          const updatedCouponList = [...couponData];
          updatedCouponList[updatedCouponIndex] = response.data;
          setCouponData(updatedCouponList);
        }
        setSuccess("Coupon Updated");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        setCouponEdit(false);
      })
      .catch((error) => {
        console.error("Error updating coupon:", error);
        setError("An error occurred while updating the coupon");
        setTimeout(() => {
          setError("");
        }, 2000);
      });
    setCoupon(false);
    setCouponEdit(false);
  };

  return (
    <div
      className={`${
        showSection === 1 ? "block" : "hidden"
      }  relative w-full pb-32`}
    >
      {!getResError ? (
        <>
          <section
            className={`mx-auto mt-12 w-11/12 lg:w-2/3 ${
              editRestaurant || coupon || settings
                ? "opacity-20"
                : "opacity-100"
            }`}
          >
            <section className="mb-12 flex items-center justify-between">
              <Link to={`/r`} className="flex items-center gap-2 text-sm">
                <FaArrowLeftLong className="cursor-pointer" />
                <span>Back</span>
              </Link>

              <section className="flex gap-5">
                <Link
                  to={`/r/${selectedRestaurantName}/qr-code`}
                  className="flex items-center gap-2"
                >
                  <p className="text-sm font-bold">QR Code</p>
                  <FaQrcode />
                </Link>
                <Link
                  to={`/r/${selectedRestaurantName}/support`}
                  className="flex items-center gap-2"
                >
                  <p className="text-sm font-bold">Support</p>
                  <MdOutlineSupportAgent />
                </Link>
              </section>
            </section>
            {success || error ? (
              <p
                className={`mb-4 mt-12 rounded-lg py-2 text-center font-bold text-white ${success ? "bg-green-500" : "bg-red-600"}`}
              >
                {success || error}
              </p>
            ) : null}
            <section className="relative">
              {restaurant.image_restaurant_url ||
              restaurant.image_restaurant ? (
                <div className="relative h-48 w-full">
                  <img
                    className="h-full w-full rounded-lg object-cover"
                    src={
                      restaurant.image_restaurant_url ||
                      restaurant.image_restaurant
                    }
                    alt=""
                  />
                  <div className="absolute inset-0 rounded-lg bg-black opacity-30"></div>
                </div>
              ) : null}
              {restaurant.image_logo_url || restaurant.image_logo ? (
                <img
                  className="absolute bottom-0 left-0 w-32 rounded-full"
                  src={restaurant.image_logo_url || restaurant.image_logo}
                  alt=""
                />
              ) : null}
            </section>

            <section className="my-6">
              <section className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
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
              {restaurant.wifi_password ? (
                <p className="mt-4 flex items-center gap-2">
                  <FaWifi className="text-mainColor" />
                  <span>{restaurant.wifi_password}</span>
                </p>
              ) : null}
              {restaurant.address ? (
                <p className="my-2 flex items-center gap-2">
                  <IoLocation className="text-mainColor" />
                  <span>{restaurant.address}</span>
                </p>
              ) : null}
              {restaurant.description ? (
                <p className="flex items-center gap-2">
                  <MdOutlineDescription className="text-mainColor" />
                  <span>{restaurant.description}</span>
                </p>
              ) : null}
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
            <form
              onSubmit={updateRestaurant}
              className="flex flex-col gap-4"
              action=""
            >
              <input
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                type="text"
                placeholder="Wifi Password"
                onChange={(e) => setWifi(e.target.value)}
              />
              <input
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label className="text-lg font-bold">Restaurant Image</label>
              <input
                onChange={(e) => setResImage(e.target.files[0])}
                type="file"
                accept="image/*"
              />
              <label className="text-lg font-bold">Restaurant Logo</label>
              <input
                onChange={(e) => setResLogo(e.target.files[0])}
                type="file"
                accept="image/*"
              />
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
            {couponData.length ? (
              couponData.map((cop) => (
                <section key={cop.id}>
                  <section className="flex items-center justify-between">
                    <h2 className="mb-3 mt-4 text-xl font-bold">
                      Coupon Details
                    </h2>
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
                  <section className="mt-3 flex flex-col gap-3 text-gray-600">
                    <p className="flex justify-between rounded-lg border px-2 py-1">
                      <span>Discount Percentage:</span>
                      <span className="font-bold">
                        {couponData[0].discount_percentage}
                      </span>
                    </p>
                    <p className="flex justify-between rounded-lg border px-2 py-1">
                      <span>Order Requirements:</span>
                      <span className="font-bold">
                        {couponData[0].order_requirement}
                      </span>
                    </p>
                    <p className="flex justify-between rounded-lg border px-2 py-1">
                      <span>Minimum Order Price:</span>
                      <span className="font-bold">
                        {couponData[0].minimum_order_price}
                      </span>
                    </p>
                    <p className="flex justify-between rounded-lg border px-2 py-1">
                      <span>Expiry Duration:</span>
                      <span className="font-bold">
                        {couponData[0].expiry_duration}
                      </span>
                    </p>
                    <p className="flex justify-between rounded-lg border px-2 py-1">
                      <span>Is Currently Active:</span>
                      <span className="font-bold">
                        {couponData[0].is_active ? "true" : "false"}
                      </span>
                    </p>
                    <p className="flex justify-between rounded-lg border px-2 py-1">
                      <span>Activation Date:</span>
                      <span className="font-bold">
                        {couponData[0].activation_date.slice(0, 10)}
                      </span>
                    </p>
                    <p className="flex justify-between rounded-lg border px-2 py-1">
                      <span>Created At:</span>
                      <span className="font-bold">
                        {couponData[0].created_at.slice(0, 10)}
                      </span>
                    </p>
                  </section>
                </section>
              ))
            ) : (
              <>
                <h1 className="text-center text-2xl font-bold">
                  No Coupons to show
                </h1>
                <button
                  onClick={() => setCouponAdd(true)}
                  className="mx-auto mt-4 flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-white outline-none"
                >
                  <IoMdAddCircle />
                  <span>Add Coupons</span>
                </button>
              </>
            )}

            {/*create coupon  */}
            <section
              className={`${
                couponAdd ? "block" : "hidden"
              } absolute left-0 top-0 w-full bg-gray-100 px-4 py-12 shadow-lg xs:p-12`}
            >
              <h1 className="text-2xl font-bold">Create Coupon</h1>
              <form
                onSubmit={addCoupon}
                action=""
                className="mt-4 flex flex-col gap-3"
              >
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  type="number"
                  placeholder="Discount Percentage (1% - 100%)"
                  onChange={(e) => setAddCouponDiscout(e.target.value)}
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  type="number"
                  placeholder="Number of Orders Required"
                  onChange={(e) => setAddCouponOrdersReq(e.target.value)}
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  type="number"
                  placeholder="Minimum Order price"
                  onChange={(e) => setAddCouponOrderPrice(e.target.value)}
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  type="number"
                  placeholder="Expiration Duration (in days)"
                  onChange={(e) => setAddCouponExpDate(e.target.value)}
                />
                <section className="mt-3 flex items-center gap-2">
                  <label className="text-sm" htmlFor="isActive">
                    Is Currently Active
                  </label>
                  <input
                    id="isActive"
                    className="accent-mainColor"
                    type="checkbox"
                    onChange={(e) => setAddCouponActive(e.target.checked)}
                  />
                </section>
                <section className="mt-4 flex gap-4">
                  <button
                    onClick={() => {
                      setCouponAdd(false);
                    }}
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

            {/* edit coupon */}

            <section
              className={`${
                couponEdit ? "block" : "hidden"
              } absolute left-0 top-0 w-full bg-gray-100 px-4 py-12 shadow-lg xs:p-12`}
            >
              <h1 className="text-2xl font-bold">Update Coupon</h1>
              <form
                onSubmit={updateCoupon}
                action=""
                className="mt-4 flex flex-col gap-3"
              >
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  type="number"
                  placeholder="Discount Percentage (1% - 100%)"
                  value={editCouponDiscout}
                  onChange={(e) => setEditCouponDiscout(e.target.value)}
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  type="number"
                  placeholder="Number of Orders Required"
                  value={editCouponOrdersReq}
                  onChange={(e) => setEditCouponOrdersReq(e.target.value)}
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  type="number"
                  placeholder="Minimum Order price"
                  value={editCouponOrderPrice}
                  onChange={(e) => setEditCouponOrderPrice(e.target.value)}
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  type="number"
                  placeholder="Expiration Duration (in days)"
                  value={editCouponExpDate}
                  onChange={(e) => setEditCouponExpDate(e.target.value)}
                />
                <section className="mt-3 flex items-center gap-2">
                  <label className="text-sm" htmlFor="isActive">
                    Is Currently Active
                  </label>
                  <input
                    id="isActive"
                    className="accent-mainColor"
                    type="checkbox"
                    value={editCouponActive}
                    onChange={(e) => setEditCouponActive(e.target.checked)}
                  />
                </section>
                <section className="mt-4 flex gap-4">
                  <button
                    onClick={() => {
                      setCouponEdit(false);
                    }}
                    className="w-full rounded-lg bg-headerBg py-2 text-white"
                  >
                    Back
                  </button>
                  <button className="w-full rounded-lg bg-mainColor py-2 text-white">
                    Update
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
                <input
                  className="accent-mainColor"
                  type="checkbox"
                  id="delivery"
                />
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
                <input
                  className="accent-mainColor"
                  type="checkbox"
                  id="dinein"
                />
              </section>
              <section className="flex items-center gap-2">
                <label className="text-sm" htmlFor="pickup">
                  Pickup Options
                </label>
                <input
                  className="accent-mainColor"
                  type="checkbox"
                  id="pickup"
                />
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
        </>
      ) : (
        <section className="mx-auto mt-8 w-1/2">
          <Link to={`/r`} className="mb-6 flex items-center gap-2 text-sm">
            <FaArrowLeftLong className="cursor-pointer" />
            <span>Back</span>
          </Link>
          <p className="rounded-lg bg-red-500 py-2 text-center font-bold text-white">
            {getResError}
          </p>
        </section>
      )}
    </div>
  );
};

export default EditRestaurant;
