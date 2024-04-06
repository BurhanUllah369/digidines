import React from "react";
import Nav from "./components/landing-page/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./components/landing-page/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import VerifyOtp from "./components/auth/VerifyOtp";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <main className="w-full font-nunito text-textColor">
      {/* <Nav /> */}
      {/* <Home/> */}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
      </Routes> */}
      <Dashboard/>
      {/* <Header /> */}
      {/* <Footer /> */}
    </main>
  );
};

export default App;
