import { useEffect, useState } from "react";
import RoomComponent from "../Components/roomComponent";
import SeeLastCol from "../Components/SeeLastCol";
import { GetCategorie } from "../API/categories";
import { FiLoader } from "react-icons/fi";
const Rooms = () => {
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

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="flex justify-center items-center mb-5  mt-10 flex-col m-auto text-center max-w-[700px]">
          <h1 className="text-7xl font-semibold my-5 text-semi-black">Rooms</h1>
          <p className="text-semi-black text-lg mb-10">
            A home is made up of various rooms, each serving a unique purpose
            and contributing to the overall comfort and functionality of the
            living space. These rooms include the Living Room, Bedroom, Kitchen,
            Bathroom, and Home Office, each designed to meet specific needs
            while enhancing the home's aesthetic appeal.
          </p>
        </div>
      </div>
      <div>
        {rooms.length > 0 ? (
          rooms.map((room) => {
            return <RoomComponent key={room.id} room={room} />;
          })
        ) : (
          <>
            <div className="text-primary text-2xl flex justify-center items-center p-4 w-10/12 m-auto bg-semi-white"> {message === 'loading...' ? <span className="flex justify-center items-center text-primary"> {message} <FiLoader className="ml-3 stroke-primary text-2xl loader "/></span> : message}    </div>
          </>
        )}
      </div>

      <SeeLastCol />
    </div>
  );
};

export default Rooms;
