// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BASE_URL } from "../constants.js";


export default function ProductList({ products, currentcategory }) {

  return (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 py-4">
      {products &&
        products.map((item, key) => {
          return (
            <li
              key={key}
              className="py-3 border hover:border-none relative group text-center hover:shadow-2xl hover:scale-105 transition-all duration-700 "
            >
              <div className="group-hover:grid place-content-center hidden group absolute top-0 right-0 py-2 justify-end px-4">
                <div className="p-2 bg-primary justify-end hover:inline-block rounded-full hover:bg-yellow-400 hover:scale-105 transition-all duration-500 cursor-pointer">
                  <MdOutlineAddShoppingCart className="fill-white text-xl" />
                </div>
              </div>
              <Link to={`/product/${item.id}`} className="">
                <img
                  src={`${BASE_URL}/${item.image}`}
                  className="max-w-full w-full mt-1"
                  alt={item.name}
                />
                <div className=" px-2">
                  <p>
                    {!currentcategory
                      ? item.category?.name
                      : currentcategory.name}
                  </p>
                  <h3 className="text-secondary">{item.name}</h3>
                  <p>Dh {item.price}</p>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
