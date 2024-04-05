import React from "react";
import Header from "./components/landing-page/Header";
import Plans from "./components/landing-page/Plans";
import Form from "./components/landing-page/Form";
import Footer from "./components/landing-page/Footer";
import ReusableComponent from "./components/reusable-components/ReusableComponent";
import { featuresData, solutionsData } from "./data/data";
import Nav from "./components/landing-page/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./components/landing-page/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Registration";

const App = () => {
  return (
    <main className="w-full font-nunito text-textColor">
      <Nav />
      {/* <Home/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <Header /> */}
      {/* <Footer /> */}
    </main>
  );
};

export default App;
