import React from "react";
import logo from "../../assets/landing-page/logo.avif";

const Item = ({ icon, heading, description }) => {
  return (
    <section>
      {icon}
      <h1>{heading}</h1>
      <p>{description}</p>
    </section>
  );
};

const Nav = () => {
  return (
    <nav className="w-full">
      <section className="w-11/12  mx-auto flex justify-between gap-12 items-center">
        <img className="w-20" src={logo} alt="" />
        <ul className="flex gap-12 font-medium">
          <li>
            <a className="features" href="#">
              Features
            </a>
          </li>
          <li>
            <a href="#">Solutions</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
        <ul className="flex gap-12">
          <li>Sign in</li>
          <li>
            <button>Get Started</button>
          </li>
        </ul>
      </section>
      <section>
        <Item/>
      </section>
    </nav>
  );
};

export default Nav;
