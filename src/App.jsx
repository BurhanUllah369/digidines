import React from "react";
import Nav from "./components/landing-page/Nav";
import Header from "./components/landing-page/Header";
import Plans from "./components/landing-page/Plans";
import Form from "./components/landing-page/Form";
import Footer from "./components/landing-page/Footer";
import ReusableComponent from "./components/reusable-components/ReusableComponent";
import { featuresData, solutionsData } from "./data/data";

const App = () => {
  return (
    <main className="w-full font-nunito text-textColor">
      {/* <Nav/> */}
      <Header />
      <Plans />
      <ReusableComponent heading="Features & Benefits" data={featuresData} />
      <ReusableComponent heading="Solutions" data={solutionsData} />
      <Form />
      <Footer />
    </main>
  );
};

export default App;
