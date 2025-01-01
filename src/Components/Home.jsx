import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filterProducts, setfilterProduct] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilterProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(category);
    if (!filterProducts || category == "undefined") setfilterProduct(products);
    if (category != "undefined") getproductscategory();
  }, [category]);
  // console.log(filterProducts);
  return products ? (
    <>
      <Nav />
      <div className=" w-[85%]  p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto ">
        {filterProducts &&
          filterProducts.map((p, i) => (
            <Link
              to={`/details/${p.id}`}
              className="card mr-3 mb-3  p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center  "
            >
              <div
                className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-300">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
