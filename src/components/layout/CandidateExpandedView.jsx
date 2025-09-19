import React from "react";
import { useLocation } from "react-router-dom";

const badgeColors = {
  Technical: "bg-blue-500",
  Design: "bg-pink-500",
  Management: "bg-green-500",
  QA: "bg-red-500",
  Ops: "bg-yellow-400",
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

function CandidateExpandedView() {

      const location = useLocation();
      const candidate = location.state?.initialData || null;


  return (
    <div className="bg-white w-full max-w-lg mx-auto mt-10 p-8 rounded-xl shadow-lg relative">

      {/* Header */}
      <div className="flex gap-5 items-center mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold">
          {getInitials(candidate.name)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">{candidate.name}</span>
            {candidate.badge && (
                     
            <span
              className={`${
                badgeColors[candidate.badge] || "bg-gray-400"
              } text-white rounded-full px-3 py-1 text-xs font-semibold`}
            >
              {candidate.badge}
            </span>
            )}
          </div>
          <div className="text-gray-500">{candidate.role}</div>
        </div>
      </div>

      {/* Contact / Details */}
      <dl className="grid grid-cols-1 gap-y-2 gap-x-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="material-icons text-base font-bold">Email:</span>
          {/* <dt className="font-medium sr-only">Email</dt> */}
          <dd className="text-gray-800">{candidate.email}</dd>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons text-base font-bold">Call:</span>
          <dd className="text-gray-800">{candidate.phone}</dd>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons text-base font-bold">Address:</span>
          <dd className="text-gray-800">{candidate.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons text-base font-bold">Exp:</span>
          <dd className="text-gray-800">{candidate.experience}</dd>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons text-base font-bold">Applied</span>
          <dd className="text-gray-800">Applied {candidate.appliedDate}</dd>
        </div>
      </dl>
      {/* About Section */}
      <div className="py-4">
        <div className="mb-1 font-bold">About:</div>
        <p className="text-gray-700">
          Sarah is a senior React developer with deep experience in building scalable applications. She is proficient in React, Redux, TypeScript, and more. (You can include portfolio, skills, projects, etc. here.)
        </p>
      </div>
      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          className="flex-1 border rounded px-5 py-2 bg-white text-gray-800 font-medium hover:bg-gray-100 hover:cursor-pointer"
          onClick={() => window.history.back()}
        >
          Close
        </button>
        <button
          type="button"
          className="flex-1 border rounded px-5 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 hover:cursor-pointer"
          onClick={() => window.location.href = `mailto:${candidate.email}`}
        >
          Contact
        </button>
      </div>
    </div>
  );
}

export default CandidateExpandedView;