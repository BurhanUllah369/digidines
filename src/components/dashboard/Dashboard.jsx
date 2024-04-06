import React from "react";
import TopNav from "./panels/TopNav";
import SideNav from "./panels/SideNav";
import Restaurants from "./Restaurants";
import RestaurantDetails from "./RestaurantDetails";
import { Route, Routes } from "react-router-dom";

const Dashboard = () => {
  return (
    <section>
      <section className="flex">
        <SideNav />
        <TopNav />
      </section>
      <section className="bg-gray-100">
        <Routes>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/r" element={<RestaurantDetails />} />
        </Routes>
      </section>
    </section>
  );
};

export default Dashboard;
