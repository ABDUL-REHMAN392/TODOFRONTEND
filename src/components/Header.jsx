import { useContext, useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { FiCheckSquare, FiLogOut } from "react-icons/fi";
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const displayName = user?.name || user?.username || "U";

  return (
    <header className="flex px-4 md:px-8 justify-between items-center h-16 border-b border-gray-200 font-medium">
      <NavLink
        to="/"
        className="flex gap-2 items-center text-xl text-blue-900 font-bold"
      >
        <IoMdCheckboxOutline className="text-2xl" />
        <h1>TodoPro</h1>
      </NavLink>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-md text-blue-900 hover:text-blue-700 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
            >
              Get Started
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold uppercase"
            >
              {displayName[0].toUpperCase()}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-3 z-50">
                <div className="px-5 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">
                    {user?.username}
                  </p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                <div className="flex flex-col mt-2">
                  <Link
                    to="/todos"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-5 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                  >
                    <FiCheckSquare size={18} />
                    Todos
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 mt-1 px-5 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150 text-left"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
