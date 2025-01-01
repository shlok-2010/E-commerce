import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filterProducts, setfilterProduct] = useState([]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilterProduct(data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  useEffect(() => {
    if (category === "undefined" || !category) {
      setfilterProduct(products || []);
    } else {
      getProductsByCategory();
    }
  }, [category, products]);

  if (!products) {
    return <Loading />;
  }

  return (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filterProducts.length > 0 ? (
          filterProducts.map((p) => (
            <Link
              key={p.id} // Added a unique key for each product
              to={`/details/${p.id}`}
              className="card mr-3 mb-3 p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center"
            >
              <div
                className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-300">{p.title}</h1>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </>
  );
};

export default Home;
