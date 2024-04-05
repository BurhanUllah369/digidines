import React from "react";
import { IoIosCall } from "react-icons/io";
import { MdMessage } from "react-icons/md"
import { CgWebsite } from "react-icons/cg";

const Footer = () => {
  return (
    <footer id="footer" className="w-full bg-mainColor text-gray-100">
      <section className="w-11/12 lg:w-2/3 mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section className="my-auto text-center">
          <h1 className="mb-4 text-4xl font-bold">Digi Dines</h1>
          <p>Your Digital Menu Solution</p>
        </section>
        <section>
          <h1 className="mb-4 text-2xl font-bold underline">About Us</h1>
          <p>
            Digi Dines is a digital menu solution that simplifies restaurant
            management. It is a cost-effective solution that helps you to run
            your restaurant business effortlessly.
          </p>
        </section>
        <section className="md:col-span-2 lg:col-span-1">
            <h1 className="mb-4 text-2xl font-bold underline">Contact Us</h1>
            <p className="mt-3 flex items-center gap-3"><MdMessage className="text-xl"/><span>support@skytechcybercloud.com</span></p>
            <p className="mt-3 flex items-center gap-3"><IoIosCall className="text-xl"/><span>+971 50 743 7958</span></p>
            <a className="mt-3 flex items-center gap-3" href="https://skytechdigital.ae/"><CgWebsite className="text-xl"/><span>skytechdigital.ae</span></a>
        </section>
      </section>
      <p className="p-4 text-sm md:text-base text-center bg-gray-950">© 2024 Digi Dines a product of Skytech Cyber Cloud. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
