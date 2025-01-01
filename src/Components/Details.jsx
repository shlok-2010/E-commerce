import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";

const Details = () => {
  const navigate = useNavigate();
  const [products] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (products && id) {
      const foundProduct = products.find((p) => p.id.toString() === id);
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  if (!product) {
    return <Loading />; // Replace with a loading spinner or message
  }
  const productDeleteHandler = (id) => {
    const FilterProducts = products.filter((p) => p.id !== id);
    console.log(FilterProducts)
    setProduct(FilterProducts);
    localStorage.setItem("products", JSON.stringify(FilterProducts));
    navigate("/");
    
  };

  return (
    <div className="w-[70%] flex justify-between items-center h-full m-auto p-[10%]">
      <img
        className="object-contain w-[40%] h-[100%]"
        src={product.image}
        alt={product.title}
      />
      <div className="content w-[50%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 mb-3">$ {product.price}</h2>
        <p className="mb-3">{product.description}</p>
        <Link
          to={`/edit/${product.id}`}
          className="mr-5 py-2 px-5 border rounded border-blue-400 text-blue-400"
        >
          Edit
        </Link>
        <button
          onClick={() => productDeleteHandler(product.id)}
          className="py-2 px-5 border rounded border-red-400 text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Details;
