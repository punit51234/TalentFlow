import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Assessment from "./Assessment";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="h-screen fixed top-0 left-0">

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
        onClick={() => setSidebarOpen(false)}
        />
      )}
      
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <div className="flex items-center p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-blue-500 focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-4 text-lg font-bold">TalentFlow</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}