import React, { useEffect, useState, createContext } from "react";
import axios from "../utils/axios";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || null);

  // const getProducts = async () => {
  //   try {
  //     const { data } = await axios("/products");
  //     setProducts(data);
  //     console.log(data); 
  //   } catch (error) {
  //     console.log("Error fetching products:", error);
  //   }
  // };

  // useEffect(() => {
  //   getProducts(); 
  // }, []); 

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
