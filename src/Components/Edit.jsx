import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  // Handle input changes
  const ChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Load the product based on ID
  useEffect(() => {
    const foundProduct = products.find((p) => p.id.toString() === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  // Handle form submission
  const AddProductHandler = (e) => {
    e.preventDefault();

    // Input validation
    if (
      product.title.trim().length < 3 ||
      product.image.trim().length < 3 ||
      product.category.trim().length < 3 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 3
    ) {
      alert("Each input must have at least 3 characters.");
      return;
    }

    // Find index of the product to update
    const productIndex = products.findIndex((p) => p.id.toString() === id);
    if (productIndex === -1) {
      alert("Product not found.");
      return;
    }

    // Create a copy of the products array and update the specific product
    const updatedProducts = [...products];
    updatedProducts[productIndex] = { ...product };

    // Update state and local storage
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col p-[5%] w-screen h-full items-center"
    >
      <h1 className="mb-3 text-3xl">Edit Product</h1>
      <input
        type="url"
        placeholder="Image link"
        className="text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={ChangeHandler}
        value={product.image || ""}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3"
        name="title"
        onChange={ChangeHandler}
        value={product.title || ""}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category"
          className="text-2xl bg-zinc-300 rounded p-3 w-[48%] mb-3"
          name="category"
          onChange={ChangeHandler}
          value={product.category || ""}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-2xl bg-zinc-300 rounded p-3 w-[48%] mb-3"
          name="price"
          onChange={ChangeHandler}
          value={product.price || ""}
        />
      </div>
      <textarea
        name="description"
        onChange={ChangeHandler}
        placeholder="Enter product description here..."
        value={product.description || ""}
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-2"
        rows="10"
      ></textarea>
      <div className="w-1/2">
        <button
          type="submit"
          className="self-start py-2 px-5 border rounded border-blue-400 text-blue-400"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Edit;
