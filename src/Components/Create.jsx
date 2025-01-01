import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();

    
    if (
      title.trim().length < 3 ||
      image.trim().length < 3 ||
      category.trim().length < 3 ||
      price.trim().length < 1 ||
      description.trim().length < 3
    ) {
      alert("Each input must have at least 4 characters ");
      return;
    }

   
    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };

    
    setProducts([...products, product]);
    localStorage.setItem("products", JSON.stringify(products))
    navigate("/")

    
    setTitle("");
    setImage("");
    setCategory("");
    setPrice("");
    setDescription("");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col p-[5%] w-screen h-full items-center"
    >
      <h1 className="mb-3 text-3xl">Add New Products</h1>
      <input
        type="url"
        placeholder="Image link"
        className="text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category"
          className="text-2xl bg-zinc-300 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-2xl bg-zinc-300 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter product description here..."
        value={description}
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-2"
        rows="10"
      ></textarea>
      <div className="w-1/2">
        <button
          type="submit"
          className="self-start py-2 px-5 border rounded border-blue-400 text-blue-400"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
