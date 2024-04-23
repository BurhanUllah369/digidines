import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./components/styles.css";
import { BrowserRouter } from "react-router-dom";
import { RestaurantsPathsProvider } from "./context/restaurantsPathsContext.jsx";
import { SideMenuProvider } from "./context/sideMenuContext.jsx";
import { SectionProvider } from "./context/restaurantDetailsContext.jsx";
import { RestaurantSectionProvider } from "./context/editRestaurant.jsx";
import { ProductDetailsProvider } from "./context/productDetailsContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { AddonIdProvider } from "./context/addonIdContext.jsx";
import { SelectedAddonProvider } from "./context/addonData.jsx";
import { MenuProvider } from "./context/menuContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RestaurantsPathsProvider>
      <UserProvider>
        <MenuProvider>
          <ProductProvider>
            <CartProvider>
              <SelectedAddonProvider>
                <ProductDetailsProvider>
                  <AddonIdProvider>
                    {/* <SideMenuProvider> */}
                    <SectionProvider>
                      <RestaurantSectionProvider>
                        <App />
                      </RestaurantSectionProvider>
                    </SectionProvider>
                    {/* </SideMenuProvider> */}
                  </AddonIdProvider>
                </ProductDetailsProvider>
              </SelectedAddonProvider>
            </CartProvider>
          </ProductProvider>
        </MenuProvider>
      </UserProvider>
    </RestaurantsPathsProvider>
  </BrowserRouter>,
);
