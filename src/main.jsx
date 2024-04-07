import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./components/styles.css";
import { BrowserRouter } from "react-router-dom";
import { MenuProvider } from "./context/menuContext.jsx";
import { SideMenuProvider } from "./context/sideMenuContext.jsx";
import { SectionProvider } from "./context/restaurantDetailsContext.jsx";
import { RestaurantSectionProvider } from "./context/editRestaurant.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MenuProvider>
      <SideMenuProvider>
        <SectionProvider>
          <RestaurantSectionProvider>
            <App />
          </RestaurantSectionProvider>
        </SectionProvider>
      </SideMenuProvider>
    </MenuProvider>
  </BrowserRouter>
);
