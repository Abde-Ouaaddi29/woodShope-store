import PropTypes from "prop-types";
import ProductList from "../Components/ProductList";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";

const RoomComponent = ({ room }) => {

  return (
    <div className="bg-semi-white pb-10">
      <div
        style={{ "--bg-img": `url(${BASE_URL}/${room.image})` }}
        className={`bg-[image:var(--bg-img)] bg-cover   h-[100vh]`}
        id={room.name}
      >
        <div className="container px-10 pt-32 h-full grid  grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
          <div
            className="relative col-start-2 bg-white before:absolute before:top-[-30px] before:left-[-30px] before:z-10 before:content-['']  before:w-0 before:h-0 before:border-primary before:border-[30px] before:border-x-transparent before:border-t-transparent before:rotate-[-45deg] pt-16 pe-2 sm:ps-10 ps-2 text-lg
          "
          >
            <h5 className="text-2xl font-bold mb-4">{room.name}</h5>
            <p className="">{room.desc}</p>

            <div className="max-sm:flex mt-10 items-center justify-center">
              <Link
                to={`/category/${room.id}`}
                className="bg-primary py-3 px-10 uppercase tracking-wider text-semi-black font-medium text-sm rounded hover:bg-yellow-600 hover:text-white transition-all duration-700"
              >
                shop {room.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container lg:px-10 px-4 py-10 ">
        <ProductList products={room.product} currentcategory={room} />
      </div>
    </div>
  );
};

RoomComponent.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    room: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    disc: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};
export default RoomComponent;
