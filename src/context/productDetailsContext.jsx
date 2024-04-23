// customer menu 

import React, { createContext, useState, useEffect, useContext } from "react";

const ProductDetailsContext = createContext();

export const useProductDetailsContext = () => useContext(ProductDetailsContext);

export const ProductDetailsProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(() => {
    // Retrieve the selected product from local storage, or default to null if not found
    const storedProduct = localStorage.getItem("selectedProduct");
    return storedProduct ? JSON.parse(storedProduct) : null;
  });

  const setSelectedProductName = (product) => {
    setSelectedProduct(product);
    console.log(product)
  };

  useEffect(() => {
    // Save the selected product to local storage whenever it changes
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  return (
    <ProductDetailsContext.Provider value={{ selectedProduct, setSelectedProductName }}>
      {children}
    </ProductDetailsContext.Provider>
  );
};
