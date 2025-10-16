import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Navbar</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/Student" className="text-gray-300 font-bold hover:text-blue-600 transition">
              Students
            </Link>
          </li> 
          {/* <li>
            <Link to={"/Result/B26395"} className="text-gray-300 font-bold hover:text-blue-600 transition">
              Review Result
            </Link>
          </li> */}
          <li>
            <Link to={`Enter-RollNo`} className="text-gray-300 font-bold hover:text-blue-600 transition">
              Take Test
            </Link>
          </li>
          <li>
            <Link to={`Dashboard`} className="text-gray-300 font-bold hover:text-blue-600 transition">
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-700"></span>
              <span className="block w-6 h-0.5 bg-gray-700"></span>
              <span className="block w-6 h-0.5 bg-gray-700"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          <Link
            to="/Login"
            className="block text-gray-300 hover:text-blue-600 font-bold transition"
            onClick={() => setIsOpen(false)}
          >
            Create Test
          </Link>
          <Link
            to="/"
            className="block text-gray-300 hover:text-blue-600 font-bold transition"
            onClick={() => setIsOpen(false)}
          >
            Take Test
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
