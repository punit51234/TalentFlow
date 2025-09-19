import React from "react";
import { useNavigate } from "react-router-dom";
let taga = "Dashboard";
let tagLinea = "Welcome back! Here's what's happening with your hiring pipeline.";
let buttonNamea = "Create Job";


function Header({tag = taga, tagLine = tagLinea, buttonName = buttonNamea, isButton=true, path}) {
  
    const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between py-6 px-8 bg-gray-50">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{tag}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {tagLine}
        </p>
      </div>
      {isButton && (
        <button 
          className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          onClick={() => navigate(path)}
        >
        <span className="mr-2 text-lg">+</span>
        {buttonName}
      </button>)}
    </div>
  );
}

export default Header;
