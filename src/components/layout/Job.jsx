import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import JobFilter from "../dashboard/JobFilter";
import JobCard from "../ui/JobCard";
import { jobData } from "../../seed/jobs";
import useAppStore from "../../store/useAppStore";

function Job() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const initialized = React.useRef(false);
  const jobs = useAppStore((state) => state.jobs);
  const setJobs = useAppStore((state) => state.setJobs);
  const setPage = useAppStore((state) => state.setPage);
  const setPerPage = useAppStore((state) => state.setPerPage);
  const page = useAppStore((state) => state.page);
  const perPage = useAppStore((state) => state.perPage);

  useEffect(() => {
    if (!initialized.current && jobs.length === 0) {
      setJobs(jobData);
      initialized.current = true;
    }
  }, [setJobs, jobs.length]);

  if (perPage === 10) {
    setPerPage(6);
  }

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  // For convenience:
  const activeCount = statusCounts["active"] || 0;
  const archivedCount = statusCounts["archived"] || 0;
  const allCount = jobs.length;

  const filteredJobs = jobs
    .filter((job) => statusFilter === "all" || job.status === statusFilter)
    .filter((job) =>
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const start = (page - 1) * perPage;
  const currentJobs = filteredJobs.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredJobs.length / perPage);

  return (
    <div>
      <Header
        tag="Jobs"
        tagLine="Manage your job postings and track applications"
        path="/jobs/form"
      />

      <JobFilter
        searchPlaceholder="Search..."
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedFilter={statusFilter}
        onFilterChange={setStatusFilter}
        counts={{
          all: allCount,
          active: activeCount,
          archived: archivedCount,
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mx-8 mt-8">
        {currentJobs.map((row) => (
          <JobCard key={row.id} jobData={row} />
        ))}
      </div>

      {/* Pagination + Per Page Selector */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6 px-8">
        <div className="flex items-center gap-2">
          <label
            htmlFor="perPage"
            className="text-sm font-medium text-gray-700"
          >
            Rows per page:
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[6, 12, 24, 48].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Job;
