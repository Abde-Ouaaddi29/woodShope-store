import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { GetProducts } from "../API/products";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GetCategorie } from "../API/categories";
import { BASE_URL } from "../constants.js";

export default function NewCollection() {
  const [products, setProducts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRooms = async () => {
    setMessage("loading...");
    try {
      const response = await GetCategorie();
      setRooms(response);
      console.log(response);
      if (!response) {
        setMessage("No rooms");
      }
    } catch (error) {
      console.error(error.message);
      setMessage("connection issue !");
    }
  };

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
    fetchRooms();
  }, []);

  return (
    <>
      <div className=" w-full lg:w-full xl:w-12/12 md:w-12/12 flex flex-wrap justify-between px-8 py-10 lg:py-20">
        <div className=" w-full lg:w-6/12 xl:w-6/12 md:w-10/12">
          <img
            className="w-full"
            src="./src/Assets/new-main-collection.jpg"
            alt=""
          />
        </div>

        <div className=" w-full lg:w-6/12 xl:w-6/12 md:w-12/12 flex justify-center items-end mt-8 lg:mt-0 xl:mt-0 ">
          <div className=" w-full lg:w-9/12 xl:w-9/12 md:w-12/12 h-96 ">
            <div className="w-full lg:w-12/12 xl:w-12/12 mt-2 relative">
              <span className="w-3/12 lg:w-3/12 xl:w-3/12 md:w-1/12 bg-secondary h-[.6px] absolute top-3 left-0"></span>
              <span className="w-6/12 absolute top-0 text-secondary left-24 lg:left-32 xl:left-32 font-light">
                NEW COLLECTION
              </span>
            </div>

            <div className="w-12/12 lg:w-10/12 xl:w-10/12 pt-12">
              <h2 className="font-bold text-[2rem] lg-text-[2.6rem] xl:text-[2.6rem] text-black leading-tight">
                A Perfect Set For Your Rooms
              </h2>
            </div>
            <div className="pt-6 leading-loose w-11/12 ">
              <p>
                Massa cras egestas laoreet montes, dapibus eu sit etiam
                curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                quis maecenas faucibus vulputate pharetra nunc sed maecenas diam
                quisque habitasse.
              </p>
            </div>
            <div className="w-full pt-7">
              <Link
                to={"/rooms"}
                className="bg-primary w-7/12 px-4 py-3 text-semi-black tracking-widest text-[.8rem] font-semibold hover:bg-semi-gray hover:text-white hover:duration-700 hover:translate-y-0.5 "
              >
                SHOP THIS COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="px-10 py-5">
          <ProductList products={products} />
        </div>
      ) : (
        <>
          {" "}
          <div className=" px-10 text-xl text-primary ">{message}</div>{" "}
        </>
      )}

      <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-2 grid-cols-1 my-24 bg-gray-100">
        {rooms.length > 0 ?
          rooms.map((item) => {
            return (
              <>
                <CardCategory item={item} />
              </>
            );
          })
        :
        <> <div className="p-4 text-primary text-center w-full">  Rooms !!  </div> </>
        }
      </div>
    </>
  );
}

const CardCategory = ({ item }) => {

  return (
    <>
      <div className="h-[80vh] relative">
        <img
          className="w-full h-full object-cover"
          src={`${BASE_URL}/${item.image}`}
          alt={item.name}
        />
        <div className="flex justify-center items-center group w-auto absolute bottom-9 left-7 z-20 ">
          <h1 className=" font-bold text-[1.6rem] text-white group-hover:text-primary duration-500 ">
            <Link to={`category/${item.id}`}>{item.name}</Link>
          </h1>
          <FaLongArrowAltRight className="fill-white text-xl ml-2 mt-2 group-hover:fill-primary duration-500" />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-45 hover:opacity-60 hover:duration-300"></div>
      </div>
    </>
  );
};
