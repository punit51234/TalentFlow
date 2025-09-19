import React, { useState, useEffect } from "react";
import useAppStore from "../../store/useAppStore";
import { useLocation, useNavigate } from "react-router-dom";
import SkillsTagsInput from "../ui/utils/SkillsTagsInput";

function JobForm() {
  const { jobs, setJobs } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || null;
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    location: "",
    status: "active",
    minSalary: "",
    maxSalary: "",
    jobDescription: "",
    requirements: "",
  });

  const [skillsTags, setSkillsTags] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        jobTitle: initialData.jobTitle || "",
        department: initialData.department || "",
        location: initialData.location || "",
        status: initialData.status || "active",
        minSalary: initialData.minSalary || "",
        maxSalary: initialData.maxSalary || "",
        jobDescription: initialData.jobDescription || "",
        requirements: initialData.requirements || "",
      });
      setSkillsTags(initialData.skillsTags || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.jobTitle.trim()) errs.jobTitle = "Job Title is required.";
    if (!formData.department) errs.department = "Department is required.";
    if (!formData.location.trim()) errs.location = "Location is required.";
    if (!formData.jobDescription.trim()) errs.jobDescription = "Job Description is required.";

    const min = parseFloat(formData.minSalary.replace(/[$,]/g, ""));
    const max = parseFloat(formData.maxSalary.replace(/[$,]/g, ""));
    if (formData.minSalary && isNaN(min)) errs.minSalary = "Min Salary must be a valid number.";
    if (formData.maxSalary && isNaN(max)) errs.maxSalary = "Max Salary must be a valid number.";
    if (!errs.minSalary && !errs.maxSalary && min && max && min > max) {
      errs.maxSalary = "Max Salary should be greater than or equal to Min Salary.";
    }
    return errs;
  };


const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length === 0) {
    const submitData = {
      ...formData,
      skillsTags,
      id: initialData?.id || Date.now(),
    };

    if (initialData) {
      const updatedJobs = jobs.map((job) =>
        job.id === initialData.id ? submitData : job
      );
      setJobs(updatedJobs);
      // alert("Job updated successfully!");
    } else {
      setJobs([submitData, ...jobs]);
      // alert("Job created successfully!");
    }
    navigate("/jobs");
  }
};

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">{initialData ? "Edit Job" : "Create New Job"}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Job Title */}
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="jobTitle">
                Job Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g. Senior React Developer"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.jobTitle ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
              {errors.jobTitle && <p className="text-red-600 text-sm mt-1">{errors.jobTitle}</p>}
            </div>
            {/* Department */}
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="department">
                Department <span className="text-red-600">*</span>
              </label>
              <select
                id="department"
                name="department"
                className={`w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 ${
                  errors.department ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
              {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
            </div>
          </div>

          {/* Location + Status */}
          <div className="flex flex-col md:flex-row gap-4 my-6">
            {/* Location */}
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="location">
                Location <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. San Francisco, CA"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.location ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.location}
                onChange={handleChange}
                required
              />
              {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
            </div>
            {/* Status */}
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Min & Max Salary */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Min Salary */}
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="minSalary">
                Min Salary
              </label>
              <input
                type="text"
                id="minSalary"
                name="minSalary"
                placeholder="e.g. $120,000"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.minSalary ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.minSalary}
                onChange={handleChange}
              />
              {errors.minSalary && <p className="text-red-600 text-sm mt-1">{errors.minSalary}</p>}
            </div>
            {/* Max Salary */}
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="maxSalary">
                Max Salary
              </label>
              <input
                type="text"
                id="maxSalary"
                name="maxSalary"
                placeholder="e.g. $150,000"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.maxSalary ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.maxSalary}
                onChange={handleChange}
              />
              {errors.maxSalary && <p className="text-red-600 text-sm mt-1">{errors.maxSalary}</p>}
            </div>
          </div>

          {/* Skills Tags */}
          <SkillsTagsInput onTagsChange={setSkillsTags} tags={skillsTags} />

          {/* Job Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Details</h2>

            {/* Job Description */}
            <div className="mb-6">
              <label className="block font-medium mb-1" htmlFor="jobDescription">
                Job Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                rows={4}
                placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.jobDescription ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500"
                }`}
                value={formData.jobDescription}
                onChange={handleChange}
                required
              />
              {errors.jobDescription && <p className="text-red-600 text-sm mt-1">{errors.jobDescription}</p>}
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <label className="block font-medium mb-1" htmlFor="requirements">
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                placeholder="List the required skills, experience, and qualifications..."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="border border-gray-300 rounded px-5 py-2 bg-white text-gray-800 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
              onClick={() => {
                if (initialData) {
                  setFormData({
                    jobTitle: initialData.jobTitle || "",
                    department: initialData.department || "",
                    location: initialData.location || "",
                    status: initialData.status || "active",
                    minSalary: initialData.minSalary || "",
                    maxSalary: initialData.maxSalary || "",
                    jobDescription: initialData.jobDescription || "",
                    requirements: initialData.requirements || "",
                  });
                  setSkillsTags(initialData.skillsTags || []);
                } else {
                  setFormData({
                    jobTitle: "",
                    department: "",
                    location: "",
                    status: "active",
                    minSalary: "",
                    maxSalary: "",
                    jobDescription: "",
                    requirements: "",
                  });
                  setSkillsTags([]);
                }
                setErrors({});
                window.history.back();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
            >
              {initialData ? "Update Job" : "Create Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default JobForm;