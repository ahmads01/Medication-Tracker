import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center bg-darkCard border border-darkBorder rounded-md px-3 py-2 shadow-sm">
      <FiSearch className="text-gray-400" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search..."
        className="ml-2 bg-transparent outline-none text-sm text-textPrimary placeholder-gray-500 w-full"
      />
    </div>
  );
}
