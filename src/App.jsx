import React from "react";
import Nav from "./components/landing-page/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./components/landing-page/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import VerifyOtp from "./components/auth/VerifyOtp";
import Restaurants from "./components/dashboard/Restaurants";
import RestaurantDetails from "./components/dashboard/RestaurantDetails";
import CustomerMenu from "./components/dashboard/CustomerMenu";
import Cart from "./components/dashboard/Cart";
import MenuItemDetails from "./components/dashboard/MenuItemDetails";
import EditMenu from "./components/dashboard/EditMenu";
import EditProduct from "./components/dashboard/EditProduct";
import EditAddOns from "./components/dashboard/EditAddOns";
import QrCode from "./components/dashboard/QrCode";
import Support from "./components/dashboard/Support";
import AddProduct from "./components/dashboard/AddProduct";

const App = () => {
  return (
    <main className="w-full font-nunito text-textColor">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/r" element={<Restaurants />} />
        <Route path="/r/:restaurant" element={<RestaurantDetails />} />
        <Route path="/menus/:restaurant" element={<CustomerMenu />} />
        <Route path="/menus/:restaurant/cart" element={<Cart />} />
        <Route
          path="/menus/:restaurant/:product"
          element={<MenuItemDetails />}
        />
        <Route path="/r/:restaurant/edit-menu" element={<EditMenu />} />
        <Route
          path="/r/:restaurant/edit-menu/edit-product"
          element={<EditProduct />}
        />
        <Route
          path="/r/:restaurant/edit-menu/add-product"
          element={<AddProduct />}
        />
        <Route path="/r/:restaurant/edit-addon" element={<EditAddOns />} />
        <Route path="/r/:restaurant/qr-code" element={<QrCode />} />
        <Route path="/r/:restaurant/support" element={<Support />} />
      </Routes>
      {/* <Dashboard /> */}
      {/* <Header />
      <Footer /> */}
    </main>
  );
};

export default App;
