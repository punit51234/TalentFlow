import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import Filter from "../dashboard/Filter";
import CandidateCard from "../ui/CandidateCard";
import { candidateData } from "../../seed/candidate";
import useAppStore from "../../store/useAppStore";

function Candidate() {
  const { candidates, setCandidates, page, perPage, setPage, setPerPage } =
    useAppStore();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCandidates(candidateData);
  }, [setCandidates]);

  const statusCounts = candidates.reduce(
  (acc, candidate) => {
    acc[candidate.status] = (acc[candidate.status] || 0) + 1;
    return acc;
  },
  {} 
);

  // For convenience:
  const appliedCount = statusCounts["Applied"] || 0;
  const screeningCount = statusCounts["Screening"] || 0;
  const rejectedCount = statusCounts["Rejected"] || 0;
  const allCount = candidates.length;

  const filteredCandidates = candidates
    .filter(
      (candidate) => statusFilter === "all" || candidate.status === statusFilter
    )
    .filter((candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const start = (page - 1) * perPage;
  const currentCandidates = filteredCandidates.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredCandidates.length / perPage);

  return (
    <div>
      <Header
        tag="Candidates"
        tagLine="Manage candidate pipeline and track application progress"
        isButton={false}
      />

      <Filter
        searchPlaceholder="Search..."
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedFilter={statusFilter}
        onFilterChange={setStatusFilter}
        counts={{
          all: allCount,
          Applied: appliedCount,
          Screening: screeningCount,
          Rejected: rejectedCount
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 px-4 mb-8 mt-8">
        {currentCandidates.map((row, idx) => (
          <CandidateCard key={idx} initialData={row} />
        ))}
      </div>

      {/* Pagination + Per Page Selector */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6 px-8">
        {/* Rows per page */}
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
            {[10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination */}
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

export default Candidate;
