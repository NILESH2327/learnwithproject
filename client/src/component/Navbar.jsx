import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-15 bg-gray-500 text-white flex items-center justify-between px-8">
      
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer">
        Logo
      </div>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 text-lg">
        <li className="cursor-pointer hover:text-blue-400 transition">Home</li>
        <li className="cursor-pointer hover:text-blue-400 transition">About</li>
        <li className="cursor-pointer hover:text-blue-400 transition">Contact</li>
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden cursor-pointer text-2xl">
        ☰
      </div>

    </nav>
  );
};

export default Navbar;
