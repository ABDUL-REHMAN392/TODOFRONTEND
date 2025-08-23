import { useState } from "react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null; 

  return (
    <div className="relative">
   
      <div
        className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {user.username ? user.username[0].toUpperCase() : "U"}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg py-3 z-50">
          <p className="px-4 py-1 text-gray-800 font-semibold">
            {user.username}
          </p>
          
          <p className="px-4 py-1 text-gray-600 text-sm">
            {user.email}
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload(); 
            }}
            className="w-full text-left px-4 py-2 mt-2 hover:bg-gray-100 text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
