import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-500 shadow-md">
     <h1>Navbar</h1>
    </nav>
  );
}

export default Navbar;
