import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext"; // Import the context hook
import { useEditRestaurantContext } from "../../context/editRestaurant";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";

const Menu = ({
  menuName,
  imageUrl,
  menuId,
  onDelete,
  setSuccess,
  setError,
  fetchMenus,
  setLoading,
}) => {
  const { selectedRestaurantName, selectedRestaurantId } =
    useRestaurantsPathsContext(); // Access the selected restaurant name from the context

  const [editMenu, setEditMenu] = useState(false);
  const [menuEditName, setMenuEditName] = useState("");
  const [menuVisible, setMenuVisible] = useState("");
  const [menuImage, setMenuImage] = useState(imageUrl);

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this menu?",
    );
    if (isConfirmed) {
      onDelete(menuId);
    }
  };

  const handleEditMenu = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("restaurant", selectedRestaurantId);
    formData.append("name", menuEditName);
    formData.append("is_visible", menuVisible);

    if (menuImage) {
      formData.append("image", menuImage);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${API_ENDPOINTS.UPDATE_MENU}${menuId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);

      setMenuEditName("");
      setMenuVisible(true);
      setMenuImage(null);

      setSuccess("Menu updated successfully!");
      fetchMenus(); // fetch menus again
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      setError("Failed to update menu");
      setTimeout(() => {
        setError("");
      }, 2000);
      console.log(error);
    } finally {
      setLoading(false);
    }
    setEditMenu(false);
  };

  return (
    <section className="rounded bg-white shadow-lg">
      <img
        className="h-40 w-full rounded-t object-cover sm:h-32 md:h-40"
        src={
          imageUrl ||
          "https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg"
        }
        alt=""
      />
      <section className="p-3 xs:p-4">
        <h2 className="flex items-center justify-between text-xl font-bold">
          {menuName}
        </h2>
        <section className="mt-4 flex items-center justify-center gap-1 rounded-lg py-2 text-lg sm:gap-3">
          <Link to={`/r/${selectedRestaurantName}/edit-menu`}>
            <button className="flex items-center gap-2 rounded-lg bg-mainColor px-3 py-1 text-xs text-white xs:text-sm">
              <p>Items</p>
              <IoMdAddCircle className="cursor-pointer" />
            </button>
          </Link>
          <button
            onClick={() => setEditMenu(true)}
            className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-1 text-xs text-white xs:text-sm"
          >
            <p>Edit</p>
            <MdEdit className="cursor-pointer" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-1 text-xs text-white xs:text-sm"
          >
            <p>Delete</p>
            <MdDelete className="cursor-pointer" />
          </button>
        </section>
        <section className="mt-2 flex justify-between">
          <button>
            <FaArrowLeftLong />
          </button>
          <button>
            <FaArrowRightLong />
          </button>
        </section>
      </section>

      {/* edit menu form  */}
      <section
        className={`mx-auto w-full md:w-3/5 ${
          editMenu ? "block" : "hidden"
        } absolute left-1/2 top-0 -translate-x-1/2 rounded-lg bg-white px-4 py-12 shadow-xl sm:p-12`}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Edit Menu Category
        </h1>
        <RxCross2
          onClick={() => setEditMenu(false)}
          className="absolute right-2 top-2 cursor-pointer text-xl"
        />
        <form
          onSubmit={handleEditMenu}
          className="flex flex-col gap-4"
          action=""
        >
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Category name"
            onChange={(e) => setMenuEditName(e.target.value)}
            required
            value={menuEditName}
          />
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="isVisible">
              Is visible
            </label>
            <input
              className="accent-mainColor"
              type="checkbox"
              id="isVisible"
              checked={menuVisible}
              onChange={(e) => setMenuVisible(e.target.checked)}
            />
          </section>
          <section>
            <label className="text-sm" htmlFor="menuImage">
              Select Menu Image
            </label>
            <input
              onChange={(e) => setMenuImage(e.target.files[0])}
              type="file"
              id="menuImage"
              accept="image/*"
            />
          </section>
          <button className="w-full rounded-lg bg-mainColor py-2 text-white">
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};

const Menus = () => {
  const { showRestaurantSection } = useEditRestaurantContext();
  const [addMenu, setAddMenu] = useState(false);
  const { selectedRestaurantId } = useRestaurantsPathsContext();
  const [menu, setMenu] = useState([]);

  // get menus

  const fetchMenus = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get(`${API_ENDPOINTS.MENU_LIST}${selectedRestaurantId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setMenu(response.data))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // add menus
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(true);
  const [image, setImage] = useState();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMenu = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("restaurant", selectedRestaurantId);
    formData.append("name", name);
    formData.append("is_visible", visible);
    formData.append("image", image);

    const token = localStorage.getItem("accessToken");

    if (token) {
      setLoading(true);
      try {
        const response = await axios.post(API_ENDPOINTS.CREATE_MENU, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setMenu([...menu, response.data]);

        setName("");
        setVisible(true);
        
        console.log(response);
        setSuccess(response.request.statusText);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } catch (error) {
        console.log(error);
        setError(error.response.data.detail || error.response.data.image[0]);
        setTimeout(() => {
          setError("");
        }, 2000);
      } finally {
        setLoading(false);
      }
      setAddMenu(false);
    }
  };

  // delete menu

  const handleDeleteMenu = async (menuId) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${API_ENDPOINTS.DELETE_MENU}${menuId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenu(menu.filter((item) => item.id !== menuId));
      setSuccess("Menu deleted!");
      fetchMenus(); // fetch menus again
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      setError("Failed to delete menu");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <section
      className={`${showRestaurantSection == 1 ? "block" : "hidden"} relative`}
    >
      {success || error ? (
        <p
          className={`mt-12 rounded-lg py-2 text-center font-bold text-white ${success ? "bg-green-500" : "bg-red-600"}`}
        >
          {success || error}
        </p>
      ) : null}
      <section className="mt-6 flex items-center justify-between">
        <h1 className="text-xl font-bold sm:text-3xl">Menus</h1>
        <button
          onClick={() => setAddMenu(true)}
          className="flex items-center justify-center gap-1 text-sm font-bold underline sm:text-base"
        >
          <span>Add Menu</span>
          <IoMdAdd />
        </button>
      </section>
      <section className="mb-12 mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {menu.length > 0 ? (
          menu.map((item) => (
            <Menu
              key={item.id}
              menuName={item.name}
              imageUrl={item.image_dropbox_url}
              menuId={item.id}
              onDelete={handleDeleteMenu}
              setError={setError}
              setSuccess={setSuccess}
              fetchMenus={fetchMenus}
              setLoading={setLoading}
            />
          ))
        ) : (
          <h1 className="col-span-3 text-center text-lg font-bold sm:text-2xl">
            No Menus to show
          </h1>
        )}
      </section>

      {/* add menu form  */}
      <section
        className={`mx-auto w-full md:w-3/5 ${
          addMenu ? "block" : "hidden"
        } absolute left-1/2 top-0 -translate-x-1/2 rounded-lg bg-white px-4 py-12 shadow-xl sm:p-12`}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Add Menu Category
        </h1>
        <RxCross2
          onClick={() => setAddMenu(false)}
          className="absolute right-2 top-2 cursor-pointer text-xl"
        />
        <form
          onSubmit={handleAddMenu}
          className="flex flex-col gap-4"
          action=""
        >
          <input
            className="rounded-lg border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Category name"
            onChange={(e) => setName(e.target.value)}
            required
            value={name}
          />
          <section className="flex items-center gap-2">
            <label className="text-sm" htmlFor="isVisible">
              Is visible
            </label>
            <input
              className="accent-mainColor"
              type="checkbox"
              id="isVisible"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
          </section>
          <section>
            <label className="text-sm" htmlFor="menuImage">
              Select Menu Image
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="menuImage"
              required
              accept="image/*"
            />
          </section>
          <button className={`w-full rounded-lg bg-mainColor py-2 text-white`}>
            {/* {!loading ? "Submit" : <span className="w-10  border-2 border-white border-r-mainColor rounded-full"></span>} */}
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};

export default Menus;
