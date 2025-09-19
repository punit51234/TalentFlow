import React from "react";
import { useLocation } from "react-router-dom";



function AssessmentView() {
  
    const location = useLocation();
    const assessment = location.state?.initialData || null;


  if (!assessment) {
    return (
      <p className="text-center mt-8 text-gray-600">
        No assessment data available.
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white px-8 pt-8 pb-2 rounded-lg border border-gray-400 mb-4 shadow space-y-8">
      {/* Basic Information */}
      <section>
        <h1 className="text-3xl font-bold mb-4">
          {assessment.assessmentTitle}
        </h1>
        <hr className="h-1 bg-black" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-10">
          <div>
            <h3 className="text-lg font-semibold">Associated Job</h3>
            <p>{assessment.associatedJob || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Estimated Time</h3>
            <p>
              {assessment.estimatedTime
                ? `${assessment.estimatedTime} minutes`
                : "N/A"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Status</h3>
            <p
              className={
                assessment.status === "active"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {assessment.status.charAt(0).toUpperCase() +
                assessment.status.slice(1)}
            </p>
          </div>
        </div>
        {assessment.description && (
          <>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-wrap text-gray-700">
              {assessment.description}
            </p>
          </>
        )}
      </section>

      {/* Sections */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Sections</h2>
        {assessment.sections && assessment.sections.length > 0 ? (
          assessment.sections.map((section, sIdx) => (
            <div
              key={sIdx}
              className="mb-8 border border-gray-300 rounded p-6 space-y-6"
            >
              <h3 className="text-xl font-semibold mb-4">
                {section.title || `Section ${sIdx + 1}`}
              </h3>
              {section.questions && section.questions.length > 0 ? (
                section.questions.map((question, qIdx) => (
                  <div key={qIdx} className="border-t pt-4 space-y-2">
                    <p className="font-medium">
                      Q{qIdx + 1}. {question.text || "(No question text)"}
                    </p>
                    {question.type === "multipleChoice" && question.options ? (
                      <ul className="list-disc list-inside space-y-1">
                        {question.options.map((opt, optIdx) => {
                          const isCorrect =
                            question.correctOptions?.includes(optIdx);
                          return (
                            <li
                              key={optIdx}
                              className={
                                isCorrect ? "font-semibold text-green-700" : ""
                              }
                            >
                              {opt || "(No option text)"}
                              {isCorrect && (
                                <span className="ml-2 text-green-600">
                                  (Correct)
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : question.type === "text" ? (
                      <p className="italic text-gray-600">
                        (Text answer question)
                      </p>
                    ) : (
                      <p className="text-gray-500">(Unknown question type)</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No questions added.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No sections available.</p>
        )}
      </section>

      <button
        type="button"
        onClick={() => window.history.back()}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        &larr; Back
      </button>
    </div>
  );
}

export default AssessmentView;
