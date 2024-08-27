import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import darklogo from "../Assets/kayuu-Logo-dark.svg";
import whitelogo from "../Assets/kayuu-Logo-white.svg";
import PropTypes from "prop-types";
import NavLinkItem from "./navLinkItem";
import { useSelector } from "react-redux";
import { RiShoppingBasketLine } from "react-icons/ri";


const NavBar = ({ handleClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [url, setUrl] = useState(location.pathname);
  const [isTrensparent, setIsTransparent] = useState(false);
  const orders = useSelector((state) => state.orders.orders)

  useEffect(() => {
    setUrl(location.pathname);
    if (url === "/") {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  }, [location, url]);
  //   console.log(url);
  return (
    <>
      <nav
        className={`py-7 px-10 shadow-lg  ${
          isTrensparent
            ? menuOpen
              ? "bg-semi-black relative  z-[999] top-0 left-0 w-full"
              : "bg-transparent absolute z-[999] top-0 left-0 w-full"
            : "bg-white "
        }`}
      >
        <div className="container mx-auto flex max-w-[1440px] flex-col md:flex-row justify-start relative md:justify-between ">
          <Link to={"/"} className="text-black w-fit font-bold flex ">
            <img
              src={isTrensparent ? whitelogo : darklogo}
              alt="Logo"
              className="h-6 w-auto inline-block mr-2 "
            />
          </Link>
          <div className="md:hidden absolute right-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`text-primary focus:outline-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-auto h-6 stroke-primary  transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <ul
            className={` mx-4 mt-3 md:flex md:m-0 md:items-center gap-6 flex-col md:flex-row ${
              menuOpen ? "" : "hidden"
            }`}
          >
            <li>
              <NavLinkItem to={"/"} isDark={isTrensparent}>
                Home
              </NavLinkItem>
            </li>
            <li>
              <NavLinkItem to={"/products"} isDark={isTrensparent}>
                Products
              </NavLinkItem>
            </li>
            <li>
              <NavLinkItem to={"/rooms"} isDark={isTrensparent}>
                Rooms
              </NavLinkItem>
            </li>
            <li>
              <NavLinkItem to={"/about"} isDark={isTrensparent}>
                About Us
              </NavLinkItem>
            </li>
            <li>
              <NavLinkItem to={"/contact"} isDark={isTrensparent}>
                Contact Us
              </NavLinkItem>
            </li>
          </ul>
          <div className="absolute right-20 md:relative md:right-0 ">
            <button
              onClick={handleClick}
              className="  text-primary relative hover:text-gray-300 md:flex items-center"
            >
              <div
                className={`absolute  font-semibold top-[-10px] left-[22px] flex justify-center items-center p-0 m-0 w-5 h-5 text-[12px] rounded-2xl 
                  text-semi-black bg-primary`}
              >
                {orders.length}
              </div>
              <RiShoppingBasketLine className="fill-primary text-2xl" />
              
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

// props validation
NavBar.propTypes = {
  handleClick: PropTypes.func,
};

export default NavBar;
