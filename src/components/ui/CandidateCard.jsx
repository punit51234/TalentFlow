import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiEye,
  FiMessageCircle,
} from "react-icons/fi";

const badgeColors = {
  Technical: "bg-blue-500",
  Design: "bg-pink-500",
  Management: "bg-green-500",
  QA: "bg-red-500",
  Ops: "bg-yellow-400",
};

export default function CandidateCard({ initialData }) {
  const {
    initials = "SJ",
    badge = "Technical",
    name = "Sarah Johnson",
    role = "Senior React Developer",
    email = "sarah.johnson@email.com",
    phone = "+1 (555) 123-4567",
    location = "San Francisco, CA",
    experience = "5 years experience",
    appliedDate = "15/1/2024",
  } = initialData;

    const navigate = useNavigate();

  return (
    <div className="bg-white border-gray-300 rounded-xl border shadow-sm p-6 w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        {/* Avatar and Name/Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-bold">
            {initials}
          </div>
          <div>
            <div className="font-bold text-lg">{name}</div>
            <div className="text-gray-500 text-sm">{role}</div>
          </div>
        </div>
        {/* Badge */}
        <span
          className={`${
            badgeColors[badge] || "bg-gray-400"
          } text-white rounded-full px-3 py-1 text-xs font-semibold`}
        >
          {badge}
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-2 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <FiMail className="text-gray-400" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="text-gray-400" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiMapPin className="text-gray-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiBriefcase className="text-gray-400" />
            <span>{experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400" />
            <span>Applied {appliedDate}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button 
          className="group flex-1 py-2 rounded-lg border border-gray-300 flex items-center justify-center gap-2 font-semibold bg-gray-50 hover:bg-purple-500 hover:text-white hover:cursor-pointer"
             onClick={() =>
                navigate("/candidates/view", { state: { initialData: initialData } })
              } 
        >
          <FiEye className="text-gray-600 group-hover:text-white" />
          View Profile
        </button>
        <button 
          className="group flex-1 py-2 rounded-lg border border-gray-300 flex items-center justify-center gap-2 font-semibold bg-gray-50 hover:text-white hover:bg-green-700 hover:cursor-pointer"
          onClick={() => window.location.href = `mailto:${initialData.email}`}
        >
          <FiMessageCircle className="text-gray-600 group-hover:text-white" />
          Contact
        </button>
      </div>
    </div>
  );
}
