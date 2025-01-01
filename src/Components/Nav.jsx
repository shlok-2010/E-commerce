import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);

  // Extract distinct categories from products
  let distinct_category = products
    ? products.reduce((acc, cv) => [...acc, cv.category], [])
    : [];

  // Remove duplicates
  distinct_category = [...new Set(distinct_category)];

  // Generate random RGBA color
  const color = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.4)`;
  };

  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
      <a
        className="py-2 px-5 border rounded border-blue-400 text-blue-400"
        href="/create"
      >
        Add New Product
      </a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-2xl w-[80%] mb-3">Category Filter</h1>
      <div className="w-[80%]">
        {distinct_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`}
            className="flex items-center mb-3"
          >
            <span
              style={{ backgroundColor: color() }}
              className="block w-[15px] mr-2 h-[15px] rounded-full"
            ></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
