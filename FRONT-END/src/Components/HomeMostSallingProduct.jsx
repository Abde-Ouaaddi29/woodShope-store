import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { GetProducts } from "../API/products";
const HomeMostSallingProduct = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchProducts1 = async () => {
    setMessage("loading...");

    try {
      let response;
      response = await GetProducts();
      setProducts(response);
      if (!response) {
        setMessage("No products");
      }
    } catch (error) {
      setMessage("Connection issue!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts1();
  }, []);

  return (
    <div className="">
      <div className="container px-10 flex flex-col">
        <div className="py-[24px] flex text-xl mb-5">
          <span className="relative text-xs uppercase tracking-wider  opacity-1 pl-[50px] text-secondary">
            <span className=" uppercase absolute top-[8px] w-[35px] h-[1px] left-0 right-0 bottom-0 bg-secondary"></span>
            best seller
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="self-start text-xl font-semibold md:text-2xl lg:text-4xl">
            Discover Our Most Selling Products
          </h3>
          <Link to={'/products'} className="bg-primary self-end px-4 py-2  uppercase text-semi-black text-sm font-semibold">
            view all Products
          </Link>
        </div>
        <div className="my-10">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default HomeMostSallingProduct;
