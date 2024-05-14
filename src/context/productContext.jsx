// Context API

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    // önceki ürünleri kaldır yükleniyor tetikle
    setProducts(null);
    //* bütün verileri al
    // https://fakestoreapi.com/products

    //* belirli kategorideki verileri al
    // https://fakestoreapi.com/products/category/jewelery
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [category]);
  return (
    <ProductContext.Provider value={{ products, category, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
}
