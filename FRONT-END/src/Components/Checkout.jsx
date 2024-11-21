import { MdOutlinePayment } from "react-icons/md";
import creditCard1 from "../Assets/CREDIT_CARD1.jpeg";
import creditCard2 from "../Assets/CREDIT_CARD2.jpeg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostOrderItems } from "../API/orders";
// import { useEffect, useState } from "react";

function Checkout() {
  const [countries, setCountries] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [products, setProducts] = useState([])

  const orderItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");
  const products = useSelector((state) => state.products?.products);
  console.log(orderItems);
  console.log(products);

  const country = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );

      const data = await response.json();
      setCountries(data.data);
      console.log("countries", countries);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setOrders(orderItems);
    country();
  }, []);

  const HandlTotal = () => {
    const total = orders.reduce(
      (sum, order) => sum + parseFloat(order.total),
      0
    );
    return total;
  };

  ////////// function to add order_items
  const OrderItemsPosted = async () => {

  orderItems.map((item) => {
      const currentProduct = products?.find(
        (product) => product.id == item.productID
      );

      const Data = 
        {
          ProductID : item.productID,
          price : currentProduct.price,
          quantity : item.quantity,
          total : item.total,
        }
      
      console.log("Data", Data);
      // PostOrderItems(Data);
    });
  };

  

  ////////// function to add order
  // const PostMainOrder = async () => {};

  return (
    <div>
      <div className="bg-gray-100 container lg:px-20 lg:py-8 lg:pb-20 px-4 py-8">
        <div className="bg-white  lg:grid grid-cols-2  ">
          <div className="  col-span-1 ">
            <div className="p-8">
              <h3>nom complete</h3>
              <div className=" flex-wrap grid gap-4 grid-cols-2 mt-3 ">
                <input
                  type="text"
                  className=" bg-white border border-slate-700 rounded-md text-gray-900 px-3 py-3"
                  placeholder="prenom"
                />
                <input
                  type="text"
                  className=" bg-white border border-slate-700 rounded-md text-gray-900 px-3 py-3"
                  placeholder="nom"
                />

                <select
                  name=""
                  id=""
                  className=" col-span-2 bg-white border border-slate-700 rounded-md text-gray-900 px-3 py-3"
                >
                  {countries.map((country) => {
                    return (
                      <>
                        <option value={country.country}>
                          {country.country}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div className=" flex-wrap grid gap-4 py-4 grid-cols-2 ">
                <input
                  type="text"
                  className=" bg-white border border-slate-700 rounded-md text-gray-900 px-3 py-3"
                  placeholder="ville"
                />

                <input
                  type="text"
                  className=" bg-white border border-slate-700 rounded-md text-gray-900 px-3 py-3"
                  placeholder="town"
                />
              </div>
              <input
                type="text"
                className="w-full  bg-white border border-slate-700 rounded-md text-gray-900 px-3 py-3"
                placeholder="Phone"
              />
              <input
                type="text"
                className="w-full mt-3  bg-white border border-slate-700 rounded-md text-gray-900 px-3 py-3"
                placeholder="Phone 2 option"
              />
            </div>

            <div className="p-8 ">
              <h3>Additional information</h3>
              <textarea
                className="  p-1  w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
                placeholder="Notes about your order,e.g. speacial notes for delivery"
                rows="2"
              ></textarea>

              <div className=" shadow p-6 mt-7  bg-yellow-50">
                <h3 className=" flex items-center text-xl text-yellow-500 font-bold mb-4">
                  Payment section{" "}
                  <span>
                    <MdOutlinePayment className="ml-2 fill-yellow-500 w-6 h-6" />
                  </span>
                </h3>
                <span className="text-sm font-light text-gray-400  ">
                  The payment section of our e-commerce website, youShop, is
                  designed to provide a seamless and secure checkout experience
                  for our customers. We exclusively support credit card
                  payments, ensuring a straightforward process. Customers simply
                  need to use their credit card application to enter our RIB,
                  the name of our platform (youShop), and the field motif, which
                  will be a unique payment key generated at checkout. This
                  method enhances security by encrypting sensitive payment
                  information and preventing fraud. Additionally, real-time
                  order tracking and status updates keep customers informed
                  throughout the purchasing process. This approach not only
                  builds user trust but also streamlines the overall shopping
                  experience on youShop.
                  <span className="font-semibold text-gray-400">
                    {" "}
                    your order will be added , then if you paid your total price
                    correctly, the order will be done . and of course if your
                    steps are not most completly we are going to contact you as
                    well as soon !
                  </span>
                </span>
              </div>

              <div>
                <div className=" mt-6 border-2 border-gray-200 flex justify-between hover:scale-105 transition-all ">
                  <span className="w-3/12 xl:p-4 p-2 bg-gray-200 text-gray-400 tracking-wider text-center xl:text-xl cursor-pointer font-bold">
                    RIB
                  </span>
                  <span className="w-9/12 xl:p-4 p-2 tracking-wider text-center font-mono xl:text-xl text-gray-400 ">
                    3423284750247291
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className=" bg-white px-6 py-8  ">
            <h3 className="pb-4">Your order</h3>
            {orders && orders.length > 0 ? (
              <table className="w-5/6 text-sm text-left border rounded-t-lg">
                <thead className="text-md font-medium text-gray-400 ">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.length > 0 && products.length > 0
                    ? orders.map((order) => {
                        const product = products.find(
                          (item) => item.id == order.productID
                        );
                        return (
                          <>
                            <tr className=" border  ">
                              <th className="px-6 py-4 font-medium text-gray-600 ">
                                {product.name} × {order.quantity}
                              </th>
                              <td className="px-6 py-4 ">{order.total} MAD</td>
                            </tr>
                          </>
                        );
                      })
                    : ""}
                </tbody>
                <tfoot>
                  {/* <tr className="border">
                    <th className="px-6 py-4 font-medium text-gray-500 ">
                      Subtotal
                    </th>
                    <td className="px-6 py-4">$1,750.00</td>
                  </tr> */}
                  <tr className="border">
                    <th className="px-6 py-4 text-xl font-bold text-gray-500 ">
                      Total
                    </th>
                    <td className="px-6 py-4 lg:text-xl xl:text-xl text-sm font-bold text-gray-500">
                      {HandlTotal()} MAD
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <div>no orders placed !</div>
            )}
          </div>

          <div className="p-8 pb-16 " onClick={() => OrderItemsPosted()}>
            <button className="flex items-center justify-center bg-primary  w-full   px-10 py-2 text-black hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-semi-black  py-4 lg:grid grid-cols-2 ">
        <div className=" text-center text-white mb-4 l p-[30px] ">
          Copyright © 2024 Online Furniture Store
        </div>
        <div className=" text-center text-white p-[30px]">
          Powered by Online Furniture Store
        </div>
      </footer>
    </div>
  );
}
export default Checkout;
