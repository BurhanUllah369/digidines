import React from "react";
import Header from "./Header";
import Plans from "./Plans";
import ReusableComponent from "../reusable-components/ReusableComponent";
import { featuresData, solutionsData } from "../../data/data";
import Form from "./Form";
import Footer from "./Footer";

const Home = () => {
  return (
    <section>
      <Header />
      <ReusableComponent
        heading="Features & Benefits"
        data={featuresData}
        id="features"
      />
      <ReusableComponent
        heading="Solutions"
        data={solutionsData}
        id="solutions"
      />
      <Plans />
      <Form />
      <Footer />
    </section>
  );
};

export default Home;
