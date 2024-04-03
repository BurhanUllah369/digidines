import React from "react";
import Nav from "./components/landing-page/Nav";
import Header from "./components/landing-page/Header";
import Plans from "./components/landing-page/Plans";
import Form from "./components/Form";

const App = () => {
  return (
    <main className="w-full font-nunito text-textColor">
      {/* <Nav/> */}
      <Header />
      <Plans />
      <Form/>
    </main>
  );
};

export default App;
