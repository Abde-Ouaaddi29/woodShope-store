import { useParams } from "react-router-dom";
import { ShowCategory } from "../API/categories";
import { useEffect, useState } from "react";

import ProductList from "./ProductList";
import { FiLoader } from "react-icons/fi";

const CategoryPageHeader = () => {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const { id } = useParams();

  const showcategory = async () => {
    setMessage("loading...");
    try {
      const response = await ShowCategory(id);
      console.log(response);
      setCategory(response);

      if (!response) {
        setMessage("something went wrong!");
      }
    } catch (error) {
      console.log(error.message);
      setMessage("connection issue !");
    }
  };

  useEffect(() => {
    showcategory();
  }, [id]);

  if (!category) {
    return (
      <div className="p-4 flex justify-center items-center text-2xl text-primary ">
        {" "}
        {message === "loading..." ? (
         <> <span className="text-2xl text-primary">loading...</span> <FiLoader className="ml-3 stroke-primary text-3xl loader " /></>
        ) : (
          message
        )}{" "}
      </div>
    );
  }

  return (
    <>
      <div className="mx-6 my-8 px-4 py-6 bg-gray-50 shadow-lg">
        <h3 className="text-4xl font-semibold text-black my-5">
          {category.name}
        </h3>
        <p> {category.desc} </p>

        <div className="border-t-2 lg:p-4 py-3 mt-6">
          <ProductList
            products={category.product}
            currentcategory={category.name}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryPageHeader;
