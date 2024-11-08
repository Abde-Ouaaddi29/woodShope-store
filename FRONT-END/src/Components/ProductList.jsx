// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BASE_URL } from "../constants.js";
import { useState } from "react";

export default function ProductList({ products, currentcategory }) {
  const [productslist, setProducts] = useState(products)

  const handleAddToCard = (id) => {
    console.log(id)
    const product = productslist.find((item) => item.id == id)

    const NewOrdderItem = {
      productID: product.id,
      quantity: 1,
      // total: quantity * product.price,
    };
    let orderItems = JSON.parse(sessionStorage.getItem("orderItems")) || [];

    const currentOrderItems = orderItems.find(
      (item) => item.productID == id
    );

    if (currentOrderItems) {
      console.log(currentOrderItems);
      currentOrderItems.quantity += 1;
      currentOrderItems.total = currentOrderItems.quantity * product.price;
      console.log("exist");
    } else {
      orderItems.push(NewOrdderItem);
    }

    sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
  };

  return (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 py-4">
      {productslist &&
        productslist.map((item, key) => {
          return (
            <li
              key={key}
              className="py-3 border hover:border-none relative group text-center hover:shadow-2xl hover:scale-105 transition-all duration-700 "
            >
              <div className="group-hover:grid place-content-center hidden group absolute top-0 right-0 py-2 justify-end px-4">
                <div onClick={() => handleAddToCard(item.id)} className="p-2 bg-primary justify-end hover:inline-block rounded-full hover:bg-yellow-400 hover:scale-105 transition-all duration-500 cursor-pointer">
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
