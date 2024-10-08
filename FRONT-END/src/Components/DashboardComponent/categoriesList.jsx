import React, { useEffect, useState } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CategoryCard from "./categoryCard";
import { GetCategorie } from "../../API/categories";
import { FiLoader } from "react-icons/fi";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState();

  const GetCategories = async () => {
    try {
      setMessage("loading...");
      const response = await GetCategorie();
      setCategories(response);
      console.log(response);
      if (!response.ok) {
        setMessage("No categories");
      }
    } catch (error) {
      console.log(error.message);
      setMessage("connection issue !");
    }
  };

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <>
      <div className="lg:mt-0 mt-10">
        <div className="bg-primary rounded flex justify-between items-center p-4">
          <div className="font-semibold tracking-wider text-white lg:text-xl ">
            categories List
          </div>
          <div>
            <Link to={"/dashboard/addProducts"}>
              <VscDiffAdded className="stroke-white  fill-white text-2xl hover:scale-105 transition-all" />
            </Link>
          </div>
        </div>
        {categories.length > 0 ? (
          <div className="overflow-y-auto max-h-[73vh] mt-2 p-4">
            <CategoryCard categories={categories} />
          </div>
        ) : (
          <div className="flex items-center justify-center text-primary h-[70vh] text-2xl -z-10">
            {message === "loading..." ? (
              <div className="flex text-primary">
                Loading...
                <FiLoader className="ml-3 stroke-primary text-4xl loader -z-10" />
              </div>
            ) : (
              message
            )}
          </div>
        )}
      </div>
    </>
  );
}
