import { Outlet } from "react-router-dom";
import ProductList from "../Components/ProductList";
import SideProductFilters from "../Components/SideProductFilter";
import { useEffect, useState } from "react";
import {
  FilterProductByName,
  FilterProductByPrice,
  FilterProductBySort,
  GetProducts,
} from "../API/products";
import { FiLoader } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { SETPRODUCT } from "../REDUX/ProductReducer/ActionPr";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectSorting, setSelectSorting] = useState("");
  const dispatch = useDispatch()

  const searchValue = useSelector((state) => state.products.searchValue);
  const MinMaxPrice = useSelector((state) => state.products.minMaxPrice);

  // Fetch all products
  const fetchProduct = async () => {
    try {
      setMessage("loading...");
      const response = await GetProducts();

      if (response) {
        setProducts(response);
      } else {
        setMessage("No products found");
      }
    } catch (error) {
      setMessage("Connection issue!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Fetch products by name
  const fetchProductsByName = async () => {
    try {
      setMessage("loading...");
      if (searchValue) {
        const response = await FilterProductByName(searchValue);
        setProducts(response);
      }
    } catch (error) {
      setMessage("Connection issue!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductsByName();
  }, [searchValue]);

  // Fetch products by price range
  const fetchProductByPrices = async () => {
    try {
      setMessage("loading...");
      if (MinMaxPrice && (MinMaxPrice[0] > 1 || MinMaxPrice[1] < 9000)) {
        const response = await FilterProductByPrice(MinMaxPrice[0], MinMaxPrice[1]);
        setProducts(response);
      }
    } catch (error) {
      setMessage("Connection issue!");
      console.error(error);
    }
  };

  useEffect(() => {
    // if (MinMaxPrice[0] > 11 || MinMaxPrice[1] < 3456) {
      fetchProductByPrices();
    // }
  }, [MinMaxPrice]);

  // Fetch products by sorting
  const fetchProductBySorting = async () => {
    try {
      setMessage("loading...");
      if (selectSorting) {
        const response = await FilterProductBySort(selectSorting);
        setProducts(response);
      }
    } catch (error) {
      setMessage("Connection issue!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductBySorting();
  }, [selectSorting]);

  function handleToggleFilters() {
    setShowFilters((prev) => !prev);
  }

  return (
    <>
      {showFilters && (
        <SideProductFilters handleToggleFilters={handleToggleFilters} />
      )}
      <div className="bg-semi-white">
        <div className="container m-auto w-full my-5 px-10 bg-white">
          <Outlet />
          <div className="w-full flex justify-between py-5 max-sm:flex-col">
            <div className="flex max-md:flex-col">
              <button
                onClick={handleToggleFilters}
                className="flex items-center justify-center gap-2 me-3 bg-primary px-2 py-1"
              >
                <span className="w-4 h-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"></path>
                  </svg>
                </span>
                <span className="uppercase">Options</span>
              </button>
              {products.length > 0 ? (
                <p className="my-2">
                  Showing 1 - {products.length} of {products.length} results
                </p>
              ) : (
                <span className="my-2">{products.length} products</span>
              )}
            </div>
            <div className="">
              <form className="">
                <select
                  onChange={(e) => setSelectSorting(e.target.value)}
                  className="border px-2 py-1"
                  defaultValue={""}
                >
                  <option value="">Default sorting</option>
                  <option value="created_at">Sort by latest</option>
                  <option value="priceAsc">Sort by price: low to high</option>
                  <option value="priceDesc">Sort by price: high to low</option>
                </select>
              </form>
            </div>
          </div>
          {products.length < 1 ? (
            <div className="flex justify-center items-center text-primary text-2xl p-4">
              {message === "loading..." ? (
                <>
                  <span className="text-primary">loading...</span>{" "}
                  <FiLoader className="ml-3 stroke-primary text-3xl loader " />
                </>
              ) : (
                message
              )}
            </div>
          ) : (
            <div className="py-6">
              <ProductList products={products} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
