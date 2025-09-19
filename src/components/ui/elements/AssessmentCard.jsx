import React from "react";
import { useNavigate } from "react-router-dom";
import { FiFileText, FiClock, FiUsers, FiBarChart2, FiEdit2, FiEye } from "react-icons/fi";

function Badge({ children, color = "bg-blue-500" }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs text-white font-semibold mr-2 ${color}`}>
      {children}
    </span>
  );
}

export default function AssessmentCard({assessmentData}) {


  let {
  assessmentTitle = "Senior React Developer Assessment",
  associatedJob = "Senior React Developer",
  questions = 15,
  estimatedTime = "45 min",
  responses = 8,
  avgScore = 87,
  status,
  description,
} = assessmentData;

  const navigate = useNavigate();




  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-6 w-full mx-auto mb-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-bold text-lg">{assessmentTitle}</div>
          <div className="text-gray-500 text-sm">{associatedJob}</div>
        </div>
        <div className="flex items-center">
          <Badge color={status === "active" ? "bg-green-500" : "bg-red-500"}>{status}</Badge>
          {/* {active && (
            <Badge color="bg-green-500">{status}</Badge>
          )} */}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <FiFileText className="text-gray-400" />
          {questions} questions
        </div>
        <div className="flex items-center gap-2">
          <FiClock className="text-gray-400" />
          {estimatedTime}
        </div>
        <div className="flex items-center gap-2">
          <FiUsers className="text-gray-400" />
          {responses} responses
        </div>
        <div className="flex items-center gap-2">
          <FiBarChart2 className="text-gray-400" />
          {avgScore}% avg score
        </div>
      </div>
      <div className="mt-6 mb-2 text-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-700 font-bold">Discription</span>
        </div>
        <div className="rounded w-full">
          {description}
        </div>
      </div>
      <div className="mt-2 mb-2 text-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-700">Average Score</span>
          <span className="font-bold">{avgScore}%</span>
        </div>
        <div className="bg-gray-200 rounded h-2 w-full">
          <div
            className="bg-blue-500 rounded h-2"
            style={{ width: `${avgScore}%` }}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button 
          className="group flex-1 py-2 rounded-lg border border-gray-300 flex items-center justify-center gap-2 font-semibold bg-gray-50 hover:bg-purple-500 hover:text-white transition hover:cursor-pointer"
          onClick={() =>
                  navigate("/assessments/form", { state: { initialData: assessmentData } })
                }  
        >
          <FiEdit2 className="text-gray-600 group-hover:text-white" />
          Edit
        </button>
        <button 
        className="group flex-1 py-2 rounded-lg border border-gray-300 flex items-center justify-center gap-2 font-semibold bg-gray-50 hover:bg-blue-500 hover:text-white transition hover:cursor-pointer"
        onClick={() =>
                  navigate("/assessments/view", { state: { initialData: assessmentData } })
                }
        >
          <FiEye className="text-gray-600 group-hover:text-white" />
          Preview
        </button>
      </div>
    </div>
  );
}