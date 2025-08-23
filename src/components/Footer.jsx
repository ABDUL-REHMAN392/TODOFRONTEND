import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 py-4 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TodoPro. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
