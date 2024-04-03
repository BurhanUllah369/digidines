import React from "react";
import { IoCheckmark } from "react-icons/io5";

const features = {
  one: [
    "Item rows (upto 50)",
    "Delivery orders 0",
    "Takeaway order 0",
    "Dinein orders (upto 100)",
    "Tables can be added (upto 10)",
    "Basic reports and analytics",
    "Multi-branches (upto 1)",
  ],
  two: [
    "Item rows (upto 100)",
    "Delivery orders (upto 500)",
    "Takeaway order (upto 500)",
    "Dinein orders (upto 500)",
    "Tables can be added (upto 20)",
    "Advanced reports and analytics",
    "Multi-branches (upto 2)",
  ],
  three: [
    "Unlimited Item rows",
    "Unlimited Delivery orders",
    "Unlimited Takeaway order",
    "Unlimited Dinein orders",
    "Unlimited Tables can be added",
    "Advanced reports and analytics",
    "Role Management",
    "Unlimited Multi-branches",
  ],
};

const Plan = ({ heading, price, data, btn }) => {
  return (
    <section className="px-6 py-8 bg-headerBg rounded-lg shadow-xl flex flex-col">
      <h2 className="mb-4 text-xl font-bold">{heading}</h2>
      <p className="text-lg font-semibold mb-4">{price}</p>
      <ul className="flex flex-col gap-2 mb-4">
        {data.map((feature, idx) => (
          <li className="flex items-center gap-2" key={idx}>
            <IoCheckmark />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="mt-auto w-full bg-mainColor hover:bg-buttonHoverColor rounded-lg px-6 py-4 text-white transition duration-100 ease-linear">
        {btn}
      </button>
    </section>
  );
};

const Plans = () => {
  return (
    <section className="w-full">
      <section className="w-11/12 xl:w-5/6 mx-auto py-12">
        <h1 className="text-center text-3xl font-bold mb-4">Plans</h1>
        <p className="text-lg font-medium text-center">
          Choose the plan that best suits your business
        </p>
        <section className="mt-12">
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            <Plan
              heading="Silver"
              price="$ 249.00 / year"
              data={features.one}
              btn="Buy Now"
            />
            <Plan
              heading="Gold"
              price="$ 349.00 / year"
              data={features.two}
              btn="Buy Now"
            />
            <Plan
              heading="Enterprise"
              price="Contact us for pricing"
              data={features.three}
              btn="Contact Us"
            />
          </section>
        </section>
      </section>

      {/* why digidines */}
      <section className="w-full bg-mainColor">
        <section className="w-2/3 mx-auto py-12 text-gray-100">
          <h1 className="mb-4 text-xl font-bold text-center">Why Digi Dines?</h1>
          <p>
            Digidines offers a revolutionary dining experience with seamless QR
            code ordering, making it effortless for customers to place dine-in,
            pickup, or delivery orders. Empower your business with our platform,
            allowing you to create and manage multiple restaurant branches,
            customize menus with variations and addons, and streamline
            operations with intuitive table management. Join Digidines for a
            digital dining solution that enhances customer satisfaction, boosts
            restaurant efficiency, and propels your culinary venture to new
            heights.
          </p>
        </section>
      </section>
    </section>
  );
};

export default Plans;
