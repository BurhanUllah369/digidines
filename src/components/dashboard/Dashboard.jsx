// // Dashboard.js
// import React from "react";
// import TopNav from "./panels/TopNav";
// import SideNav from "./panels/SideNav";
// import Restaurants from "./Restaurants";
// import RestaurantDetails from "./RestaurantDetails";
// import { Route, Routes } from "react-router-dom";
// import EditMenu from "./EditMenu";
// import EditProduct from "./EditProduct";
// import EditAddOns from "./EditAddOns";
// import CustomerMenu from "./CustomerMenu";
// import Support from "./Support";
// import QrCode from "./QrCode";
// import MenuItemDetails from "./MenuItemDetails";
// import Cart from "./Cart";

// const Dashboard = () => {
//   return (
//     <section>
//       <section className="flex">
//         {/* <SideNav />
//         <TopNav /> */}
//       </section>
//       <section className="">
//         <Routes>
//           <Route path="/r" element={<Restaurants />} />
//           <Route path="/r/:restaurant" element={<RestaurantDetails />} />
//           <Route path="/menus/:restaurant" element={<CustomerMenu />} />
//           <Route path="/menus/:restaurant/cart" element={<Cart />} />
//           <Route path="/menus/:restaurant/:product" element={<MenuItemDetails />} />
//           <Route path="/r/:restaurant/edit-menu" element={<EditMenu />} />
//           <Route
//             path="/r/:restaurant/edit-menu/edit-product"
//             element={<EditProduct />}
//           />
//           <Route path="/r/:restaurant/edit-addon" element={<EditAddOns />} />
//           <Route path="/r/:restaurant/qr-code" element={<QrCode />} />
//           <Route path="/r/:restaurant/support" element={<Support />} />
//         </Routes>
//       </section>
//     </section>
//   );
// };

// export default Dashboard;
