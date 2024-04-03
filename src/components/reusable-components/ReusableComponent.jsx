import React from "react";

const Item = ({ icon, heading, description }) => {
  return (
    <section className="flex gap-6 p-8 shadow-lg rounded-xl">
      <span className="text-2xl text-mainColor">{icon}</span>
      <section>
        <h1 className="text-lg font-bold mb-2">{heading}</h1>
        <p className="text-gray-500">{description}</p>
      </section>
    </section>
  );
};

const ReusableComponent = ({ heading, data, styling }) => {
  return (
    <section className="w-11/12 lg:w-5/6 xl:w-3/4 my-16 mx-auto">
      <h1 className="text-3xl font-bold text-center text-mainColor mb-10">
        {heading}
      </h1>
      <section className={`grid ${styling} md:grid-cols-2 gap-12`}>
        {Object.keys(data).map((key) => (
          <Item
            key={key}
            icon={data[key].icon}
            heading={data[key].heading}
            description={data[key].description}
          />
        ))}
      </section>
    </section>
  );
};

export default ReusableComponent;
