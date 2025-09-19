import React from 'react';

function FilterButton({ label = "Applied", count = 6, onClick, selected = false }) {
  return (
    <button
      onClick={onClick}
      className={
        `px-5 py-2 rounded-md text-sm font-semibold border 
        flex items-center gap-2 whitespace-nowrap hover:cursor-pointer
        ${selected 
          ? "bg-blue-600 text-white border-blue-600 shadow-md" 
          : "bg-white text-gray-700 border-gray-200"} transition`
      }
    >
      <span>{label}</span>
      <span className={selected ? "font-bold" : "font-semibold"}>({count})</span>
    </button>
  );
}

export default FilterButton;