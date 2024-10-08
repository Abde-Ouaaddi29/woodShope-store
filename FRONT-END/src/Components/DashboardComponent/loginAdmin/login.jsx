import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AdminLogin } from '../../../API/auth/adminAuth';
import { MdDone } from 'react-icons/md';

export default function Admin() {

  const [isLogged, setIsLogged] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email.current.value.trim());
    formData.append("password", password.current.value.trim());

    if (
      formData.get("email") &&
      formData.get("password")
    ) {
      const response = await AdminLogin(formData);
      if (response) {
        console.log(response);
        setIsLogged(true);
        email.current.value = ''
        password.current.value = ''

        setTimeout(() => {
          setIsLogged(false);
          navigate('/dashboard')
        }, 3000);

      } else {
        setError("* data is not match ! please try again ");
        setIsLogged(false);
      }
    } else {
      setError("* fields are not complete ! ");
      setTimeout(() => {
        setError("");
      }, 6000);

      setIsLogged(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center absolute top-24 left-4">
        {isLogged ? (
          <div className="bg-green-100 px-6 py-4 w-full mb-6 rounded flex items-center border border-green-200">
            {" "}
            <span className="text-green-600 tracking-wide mr-2">
              you have been logged in succesfully
            </span>{" "}
            <span>
              <MdDone className="fill-green-600 stroke-green-600 text-2xl" />{" "}
            </span>{" "}
          </div>
        ) : (
          ""
          // <div className="bg-red-100 text-red-800 tracking-wide p-4 ">
          //    {error}
          // </div>
        )}
      </div>

      <form className="w-full h-[82vh] flex flex-col justify-center items-center ">
        <div className="lg:w-5/12 w-11/12 p-2 text-gray-500 flex justify-center items-center font-light mb-3">
          ADMIN
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="w-6 h-6 ms-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <div className="border border-yellow-500 shadow-xl lg:w-5/12 w-11/12 p-6 rounded-md flex flex-col justify-center items-center">
          <div className="w-10/12 flex justify-between items-center mb-3">
            <label className="font-bold " htmlFor="email">
              {/* <span className="text-red-400"> {error} </span> */}
              Email:
            </label>
            <input
              id="email"
              className={
                error
                  ? "w-8/12 p-1 outline-yellow-400 border-2 border-red-200"
                  : "w-8/12 p-1 outline-yellow-400 border-2 border-gray-200"
              }
              ref={email}
              type="email"
            />
          </div>
          <div className="w-10/12 flex justify-between items-center mb-3">
            <label className="font-bold " htmlFor="password">
              {/* <span className="text-red-400"> {error} </span>   */}
              Password:
            </label>
            <input
              id="password"
              className={
                error
                  ? "w-8/12 p-1 outline-yellow-400 border-2 border-red-200"
                  : "w-8/12 p-1 outline-yellow-400 border-2 border-gray-200"
              }
              ref={password}
              type="password"
            />
          </div>
          <div className=" w-10/12 text-start">
            {/* <span className="text-red-400 text-sm">{error} </span> */}
          </div>

          <span className="text-red-400 tracking-wide"> {error} </span>
          <div className="w-10/12 flex justify-between items-center mt-6 ">
            <button
              onClick={handleSubmit}
              className=" bg-yellow-500 px-4 py-2 rounded-sm text-white font-medium hover:bg-yellow-600 transition-all"
              type="submit"
            >
              submit
            </button>
            <div>
              <Link
                className="font-light text-yellow-500 ml-4 underline hover:text-yellow-600 transition-all"
                // to="/forgetpassword"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

