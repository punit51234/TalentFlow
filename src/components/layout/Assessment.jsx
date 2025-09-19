import React, { useEffect } from "react";
import Header from "../ui/Header";
import AssessmentMatric from "../ui/AssessmentMatric";
import AssessmentCard from "../ui/elements/AssessmentCard";
import { assessmentData } from "../../seed/assessment";
import useAppStore from "../../store/useAppStore";

function Assessment() {
  const { assessments, setAssessments, page, perPage, setPage, setPerPage } =
    useAppStore();
    const initialized = React.useRef(false);

  useEffect(() => {
    if (!initialized.current && assessments.length === 0) {
      setAssessments(assessmentData);
      initialized.current = true;
    }
  }, [setAssessments, assessments.length]);

   if (perPage === 10) {
      setPerPage(6);
    }
  const start = (page - 1) * perPage;
  const currentAssessments = assessments.slice(start, start + perPage);
  const totalPages = Math.ceil(assessments.length / perPage);

  return (
    <div>
      <Header
        tag="Assessments"
        tagLine="Create and manage job-specific assessments and quizzes"
        buttonName="Create Assessment"
        path="/assessments/form"
      />


      <AssessmentMatric />

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 mx-4 mt-8">
        {currentAssessments.map((row, idx) => (
          <AssessmentCard key={idx} assessmentData={row} />
        ))}
      </div>



      {/* Pagination */}
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
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:cursor-pointer"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
