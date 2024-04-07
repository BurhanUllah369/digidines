import React from "react";
import TopNav from "./panels/TopNav";
import SideNav from "./panels/SideNav";
import Restaurants from "./Restaurants";
import RestaurantDetails from "./RestaurantDetails";
import { Route, Routes } from "react-router-dom";
import EditMenu from "./EditMenu";
import EditProduct from "./EditProduct";

const Dashboard = () => {
  return (
    <section>
      <section className="flex">
        <SideNav />
        <TopNav />
      </section>
      <section className="">
        <Routes>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/r" element={<RestaurantDetails />} />
          <Route path="/edit-menu" element={<EditMenu />} />
          <Route path="/edit-product" element={<EditProduct />} />
        </Routes>
      </section>
    </section>
  );
};

export default Dashboard;
