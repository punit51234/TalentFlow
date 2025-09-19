import Ract from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LuBuilding2 } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";
import { IoPeopleOutline } from "react-icons/io5";
import { LuFileCheck } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";

const activeClass = "bg-[#3c83f6] text-white";
const inactiveClass = "hover:bg-gray-100 text-gray-800";

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`w-64 flex-shrink-0 h-screen overflow-y-auto fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-300 transition-transform duration-200 
      ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:w-64`}
    >
      <div className="flex items-center justify-between md:hidden p-4 ">
        <span className="text-xl font-bold">TalentFlow</span>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="hidden md:flex h-20 border-b items-center justify-center border-gray-300">
        <div className="flex gap-2">
          <LuBuilding2 className="bg-blue-700 text-white size-8 p-1 rounded-md" />
          <span className="font-bold text-xl">TalentFlow</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-col space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-6 py-3 mx-3 flex items-center rounded gap-2 ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <MdOutlineDashboard className="size-5" /> Dashboard
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `px-6 py-3 mx-3 flex items-center rounded gap-2 ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FiBriefcase className="size-5" /> Jobs
        </NavLink>

        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            `px-6 py-3 mx-3 flex items-center rounded gap-2 ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <IoPeopleOutline className="size-5" /> Candidates
        </NavLink>

        <NavLink
          to="/assessments"
          className={({ isActive }) =>
            `px-6 py-3 mx-3 flex items-center rounded gap-2 ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <LuFileCheck className="size-5" /> Assessments
        </NavLink>

        <NavLink
          to="/notification"
          className={({ isActive }) =>
            `px-6 py-3 mx-3 flex items-center rounded gap-2 ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaRegBell className="size-5" /> Notifications
        </NavLink>
      </nav>
      {/* HR Manager Section */}
      <div className="mt-auto p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center">
            HR
          </div>
          <div>
            <p className="font-semibold">HR Manager</p>
            <p className="text-xs text-gray-500">hr@talentflow.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
