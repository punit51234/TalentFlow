import React from "react";
import useAppStore from "../../store/useAppStore";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiDollarSign, FiUsers, FiCalendar, FiEdit2, FiArchive } from "react-icons/fi";

function JobCard({jobData}) {
  const {
    jobTitle,
    department,
    location,
    minSalary,
    maxSalary,
    applicants,
    posted,
    skillsTags = [],
    status = "active",
  } = jobData;

  const navigate = useNavigate();
  const { jobs, setJobs } = useAppStore();



  const archiveJob = () => {
  const updatedJobs = jobs.map(job =>
    job.id === jobData.id ? { ...job, status: "archived" } : job
  );
  setJobs(updatedJobs);
};

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-6 w-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold text-lg">{jobTitle}</div>
          <div className="text-sm text-gray-500">{department}</div>
        </div>
        <span className={`${status === "active"? "bg-green-500" : "bg-red-500"} text-white text-xs font-semibold rounded-full px-3 py-1`}>
          {status}
        </span>
      </div>
      <div className="flex flex-col text-gray-700 text-sm gap-1 mb-2">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-gray-400" />
          {location}
        </div>
        <div className="flex items-center gap-2">
          <FiDollarSign className="text-gray-400" />
          ${minSalary}  - ${maxSalary}
        </div>
        <div className="flex items-center gap-2">
          <FiUsers className="text-gray-400" />
          {applicants} applicants
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-400" />
          Posted {posted}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-1 mb-4">
        {skillsTags.map(skill => (
          <span
            key={skill}
            className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 font-semibold"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-auto">
        <button 
          className="flex-1 py-2 rounded-lg border border-gray-300 flex items-center justify-center gap-2 font-semibold bg-gray-50 hover:bg-purple-500 hover:text-white group transition hover:cursor-pointer"
          onClick={() =>
                navigate("/jobs/form", { state: { initialData: jobData } })
              }  
        >
          <FiEdit2 className="text-gray-600 group-hover:text-white" />
          Edit
        </button>
        <button 
          className="flex-1 py-2 rounded-lg border border-yellow-300 flex items-center justify-center gap-2 font-semibold text-yellow-700 bg-yellow-50 hover:bg-yellow-500 hover:text-white group transition hover:cursor-pointer"
          onClick={archiveJob}
        >
          <FiArchive className="text-yellow-700 group-hover:text-white" />
          Archive
        </button>
      </div>
    </div>
  );
}

export default JobCard;