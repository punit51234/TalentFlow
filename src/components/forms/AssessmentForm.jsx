import React, { useState, useEffect } from "react";
import useAppStore from "../../store/useAppStore";
import { useLocation, useNavigate } from "react-router-dom";

function AssessmentForm({ onSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { assessments, addAssessment, updateAssessment } = useAppStore();
  const initialData = location.state?.initialData || null;
  const [formData, setFormData] = useState({
    assessmentTitle: "",
    associatedJob: "",
    estimatedTime: "",
    status: "active",
    description: "",
  });

  const [sections, setSections] = useState([
    {
      title: "",
      questions: [
        {
          type: "multipleChoice",
          text: "",
          options: [""],
          correctOptions: [],
        },
      ],
    },
  ]);

  const [errors, setErrors] = useState({});

  // On mount or when initialData changes, load it into state for editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        assessmentTitle: initialData.assessmentTitle || "",
        associatedJob: initialData.associatedJob || "",
        estimatedTime: initialData.estimatedTime || "",
        status: initialData.status || "active",
        description: initialData.description || "",
      });

      if (
        initialData.sections &&
        Array.isArray(initialData.sections) &&
        initialData.sections.length
      ) {
        setSections(initialData.sections);
      }
    }
  }, [initialData]);

  // Handlers (handleChange, addSection, removeSection, etc.)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionTitleChange = (index, value) => {
    const newSections = [...sections];
    newSections[index].title = value;
    setSections(newSections);
  };

  const handleQuestionTypeChange = (sectionIdx, questionIdx, newType) => {
    const newSections = [...sections];
    newSections[sectionIdx].questions[questionIdx].type = newType;
    if (newType === "multipleChoice") {
      newSections[sectionIdx].questions[questionIdx].options =
        newSections[sectionIdx].questions[questionIdx].options.length > 0
          ? newSections[sectionIdx].questions[questionIdx].options
          : [""];
      newSections[sectionIdx].questions[questionIdx].correctOptions = [];
    } else {
      newSections[sectionIdx].questions[questionIdx].options = [];
      newSections[sectionIdx].questions[questionIdx].correctOptions = [];
    }
    setSections(newSections);
  };

  const handleQuestionTextChange = (sectionIdx, questionIdx, value) => {
    const newSections = [...sections];
    newSections[sectionIdx].questions[questionIdx].text = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        questions: [
          {
            type: "multipleChoice",
            text: "",
            options: [""],
            correctOptions: [],
          },
        ],
      },
    ]);
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const addQuestion = (sectionIdx) => {
    const newSections = [...sections];
    newSections[sectionIdx].questions.push({
      type: "multipleChoice",
      text: "",
      options: [""],
      correctOptions: [],
    });
    setSections(newSections);
  };

  const removeQuestion = (sectionIdx, questionIdx) => {
    const newSections = [...sections];
    newSections[sectionIdx].questions = newSections[
      sectionIdx
    ].questions.filter((_, i) => i !== questionIdx);
    setSections(newSections);
  };

  const addOption = (sectionIdx, questionIdx) => {
    const newSections = [...sections];
    newSections[sectionIdx].questions[questionIdx].options.push("");
    setSections(newSections);
  };

  const handleOptionChange = (sectionIdx, questionIdx, optionIdx, value) => {
    const newSections = [...sections];
    newSections[sectionIdx].questions[questionIdx].options[optionIdx] = value;
    setSections(newSections);
  };

  const removeOption = (sectionIdx, questionIdx, optionIdx) => {
    const newSections = [...sections];
    newSections[sectionIdx].questions[questionIdx].options.splice(optionIdx, 1);
    // Remove from correct options if present
    const correctOpts = newSections[sectionIdx].questions[
      questionIdx
    ].correctOptions.filter((idx) => idx !== optionIdx);
    newSections[sectionIdx].questions[questionIdx].correctOptions = correctOpts;
    setSections(newSections);
  };

  const toggleCorrectOption = (sectionIdx, questionIdx, optionIdx) => {
    const newSections = [...sections];
    const correctOptions =
      newSections[sectionIdx].questions[questionIdx].correctOptions;
    if (correctOptions.includes(optionIdx)) {
      newSections[sectionIdx].questions[questionIdx].correctOptions =
        correctOptions.filter((idx) => idx !== optionIdx);
    } else {
      newSections[sectionIdx].questions[questionIdx].correctOptions = [
        ...correctOptions,
        optionIdx,
      ];
    }
    setSections(newSections);
  };

  // Validation function (implement as you have it)

  const validate = () => {
    const errs = {};
    if (!formData.assessmentTitle.trim())
      errs.assessmentTitle = "Assessment Title is required.";
    if (!formData.associatedJob.trim())
      errs.associatedJob = "Associated Job is required.";
    sections.forEach((section, sIdx) => {
      const sectionErrors = {};
      if (!section.title.trim()) {
        sectionErrors.title = "Section title is required.";
      }
      const questionErrors = [];
      section.questions.forEach((q) => {
        const qErr = {};
        if (!q.text.trim()) qErr.text = "Question text is required.";
        if (q.type === "multipleChoice") {
          if (q.options.some((o) => !o.trim()))
            qErr.options = "All options must be non-empty.";
          if (q.correctOptions.length === 0)
            qErr.correctOptions = "Please select at least one correct answer.";
        }
        questionErrors.push(qErr);
      });
      if (
        Object.keys(sectionErrors).length > 0 ||
        questionErrors.some((qe) => Object.keys(qe).length > 0)
      ) {
        errs[`section-${sIdx}`] = {
          title: sectionErrors.title,
          questions: questionErrors,
        };
      }
    });
    return errs;
  };

  // Helpers for errors (hasError, getError) omitted for brevity, use as before

  const hasError = (fieldPath) => {
    const keys = fieldPath.split(".");
    let current = errors;
    for (let key of keys) {
      if (!current) return false;
      current = current[key];
    }
    return current !== undefined;
  };

  const getError = (fieldPath) => {
    const keys = fieldPath.split(".");
    let current = errors;
    for (let key of keys) {
      if (!current) return null;
      current = current[key];
    }
    return current || null;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate();
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     const payload = { ...formData, sections };
  //     console.log("Submitted Assessment Data:", payload);
  //     if (onSubmit) onSubmit(payload);
  //     alert(initialData ? "Assessment Updated!" : "Assessment Created!");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        ...formData,
        sections,
        id: initialData?.id || Date.now(),
      };
      if (initialData) {
        updateAssessment(payload);
        alert("Assessment Updated!");
      } else {
        addAssessment(payload);
        alert("Assessment Created!");
      }
      if (onSubmit) onSubmit(payload);
      navigate("/assessments"); 
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white p-8 rounded-lg shadow border border-gray-400 mb-4">
      <h1 className="text-2xl font-bold mb-2">
        {initialData ? "Edit Assessment" : "Create New Assessment"}
      </h1>
      <hr className="h-1 bg-black  mb-6" />
      <form onSubmit={handleSubmit} noValidate>
        {/* Basic Info */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="assessmentTitle"
                className="block font-medium mb-1"
              >
                Assessment Title <span className="text-red-600">*</span>
              </label>
              <input
                id="assessmentTitle"
                name="assessmentTitle"
                type="text"
                placeholder="Enter assessment title"
                value={formData.assessmentTitle}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  hasError("assessmentTitle")
                    ? "border-red-600 focus:ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {hasError("assessmentTitle") && (
                <p className="text-red-600 text-sm mt-1">
                  {getError("assessmentTitle")}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="associatedJob" className="block font-medium mb-1">
                Associated Job <span className="text-red-600">*</span>
              </label>
              <input
                id="associatedJob"
                name="associatedJob"
                type="text"
                placeholder="Enter associated job"
                value={formData.associatedJob}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  hasError("associatedJob")
                    ? "border-red-600 focus:ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {hasError("associatedJob") && (
                <p className="text-red-600 text-sm mt-1">
                  {getError("associatedJob")}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-1">
              <label htmlFor="estimatedTime" className="block font-medium mb-1">
                Estimated Time (minutes)
              </label>
              <input
                type="number"
                id="estimatedTime"
                name="estimatedTime"
                placeholder="e.g. 60"
                min={0}
                value={formData.estimatedTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="status" className="block font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter description for the assessment"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sections */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Assessment Sections</h2>
          {sections.map((section, sIdx) => (
            <div
              key={sIdx}
              className="mb-6 border border-gray-300 rounded p-4 space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor={`sectionTitle-${sIdx}`}
                  className="block font-semibold"
                >
                  Section Title
                </label>
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(sIdx)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    &times;
                  </button>
                )}
              </div>
              <input
                id={`sectionTitle-${sIdx}`}
                type="text"
                placeholder="Enter section title"
                value={section.title}
                onChange={(e) => handleSectionTitleChange(sIdx, e.target.value)}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  hasError(`section-${sIdx}.title`)
                    ? "border-red-600 focus:ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {hasError(`section-${sIdx}.title`) && (
                <p className="text-red-600 text-sm mt-1">
                  {getError(`section-${sIdx}.title`)}
                </p>
              )}

              {/* Questions */}
              <div className="mt-4 space-y-3">
                {section.questions.map((question, qIdx) => (
                  <div
                    key={qIdx}
                    className="border border-gray-300 rounded p-3 mb-3"
                  >
                    <div className="mb-2 flex items-center gap-4">
                      <label
                        htmlFor={`question-type-${sIdx}-${qIdx}`}
                        className="font-medium"
                      >
                        Question Type:
                      </label>
                      <select
                        id={`question-type-${sIdx}-${qIdx}`}
                        value={question.type}
                        onChange={(e) =>
                          handleQuestionTypeChange(sIdx, qIdx, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="text">Text Answer</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Enter question text"
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionTextChange(sIdx, qIdx, e.target.value)
                      }
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 resize-none mb-3 ${
                        hasError(`section-${sIdx}.questions.${qIdx}.text`)
                          ? "border-red-600 focus:ring-red-600"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                    {hasError(`section-${sIdx}.questions.${qIdx}.text`) && (
                      <p className="text-red-600 text-sm mt-1">
                        {getError(`section-${sIdx}.questions.${qIdx}.text`)}
                      </p>
                    )}
                    {question.type === "multipleChoice" && (
                      <div>
                        <p className="font-semibold mb-2">
                          Options (select correct answer(s)):
                        </p>
                        {question.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className="flex items-center gap-2 mb-1"
                          >
                            <input
                              type="checkbox"
                              checked={question.correctOptions.includes(optIdx)}
                              onChange={() =>
                                toggleCorrectOption(sIdx, qIdx, optIdx)
                              }
                              className="h-4 w-4"
                            />
                            <input
                              type="text"
                              value={opt}
                              placeholder={`Option ${optIdx + 1}`}
                              onChange={(e) =>
                                handleOptionChange(
                                  sIdx,
                                  qIdx,
                                  optIdx,
                                  e.target.value
                                )
                              }
                              className={`flex-1 border rounded px-2 py-1 ${
                                hasError(
                                  `section-${sIdx}.questions.${qIdx}.options`
                                )
                                  ? "border-red-600"
                                  : "border-gray-300"
                              }`}
                            />
                            {question.options.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeOption(sIdx, qIdx, optIdx)}
                                className="text-red-600 hover:text-red-800 font-bold"
                                title="Remove Option"
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        ))}
                        {hasError(
                          `section-${sIdx}.questions.${qIdx}.options`
                        ) && (
                          <p className="text-red-600 text-sm mt-1">
                            {getError(
                              `section-${sIdx}.questions.${qIdx}.options`
                            )}
                          </p>
                        )}
                        {hasError(
                          `section-${sIdx}.questions.${qIdx}.correctOptions`
                        ) && (
                          <p className="text-red-600 text-sm mt-1">
                            {getError(
                              `section-${sIdx}.questions.${qIdx}.correctOptions`
                            )}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => addOption(sIdx, qIdx)}
                          className="text-blue-600 hover:text-blue-800 font-semibold mt-2"
                        >
                          + Add Option
                        </button>
                      </div>
                    )}
                    {question.type === "text" && (
                      <p className="italic text-gray-600">
                        (Text answer question – respondent will enter free text)
                      </p>
                    )}
                    {section.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(sIdx, qIdx)}
                        className="text-red-600 hover:text-red-800 font-bold mt-2"
                        title="Remove Question"
                      >
                        Remove Question
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addQuestion(sIdx)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  + Add Question
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Section
          </button>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="reset"
            onClick={() => {
              if (initialData) {
                setFormData({
                  assessmentTitle: initialData.assessmentTitle || "",
                  associatedJob: initialData.associatedJob || "",
                  estimatedTime: initialData.estimatedTime || "",
                  status: initialData.status || "active",
                  description: initialData.description || "",
                });
                setSections(
                  initialData.sections || [
                    {
                      title: "",
                      questions: [
                        {
                          type: "multipleChoice",
                          text: "",
                          options: [""],
                          correctOptions: [],
                        },
                      ],
                    },
                  ]
                );
              } else {
                setFormData({
                  assessmentTitle: "",
                  associatedJob: "",
                  estimatedTime: "",
                  status: "active",
                  description: "",
                });
                setSections([
                  {
                    title: "",
                    questions: [
                      {
                        type: "multipleChoice",
                        text: "",
                        options: [""],
                        correctOptions: [],
                      },
                    ],
                  },
                ]);
              }
              setErrors({});
              window.history.back();
            }}
            className="border border-gray-300 rounded px-5 py-2 bg-white text-gray-800 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
          >
            {initialData ? "Update Assessment" : "Create Assessment"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssessmentForm;
