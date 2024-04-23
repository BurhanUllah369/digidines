// admin menu 

import React, { createContext, useState, useEffect, useContext } from "react";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    return storedProduct ? JSON.parse(storedProduct) : null;
  });

  const updateProduct = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    console.log(product.id, product)
  };


  useEffect(() => {
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
