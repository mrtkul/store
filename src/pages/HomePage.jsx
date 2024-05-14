import Loader from "../components/Loader";
import Card from "../components/Card";

import { useContext } from "react";
import { ProductContext } from "../context/productContext";

const HomePage = () => {
  const { products, category } = useContext(ProductContext);

  return (
    <div className="container">
      <h2 className="my-2">{category && category}</h2>
      <div className="d-flex flex-wrap justify-content-center justify-content-md-between gap-3 gap-md-4 my-5">
        {/* ürünler gelmediyse */}
        {!products && <Loader />}
        {/* ürünler geldiyse */}
        {products?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
