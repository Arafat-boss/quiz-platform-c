import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Navbar = () => {
  const { user, LogOutUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const handelGoogle = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        navigate("/quize");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error.message);
      });
  };

  return (
    <div className="navbar mt-24 fixed opacity-70 w-11/12 mx-auto rounded-xl bg-blue-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <a className="btn btn-ghost text-xl">Quiz Platform</a>
      </div>

      <div className="navbar-end"></div>
      {user && (
        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div title={user?.displayName} className="w-10 rounded-full">
              <img
                referrerPolicy="no-referrer"
                alt="User Profile Photo"
                src={user?.photoURL}
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content gap-1 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Link to="quize" className="btn">
              Quize
            </Link>

            <li className="mt-2">
              <button
                onClick={LogOutUser}
                className="bg-gray-200 block text-center"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* If user is not logged in */}
      {!user && (
        <button
          onClick={handelGoogle}
          className="flex items-center justify-center gap-2 btn mx-auto text-black px-4 py-2 rounded-lg shadow-md"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium">Sign in</span>
        </button>
      )}
    </div>
  );
};

export default Navbar;
