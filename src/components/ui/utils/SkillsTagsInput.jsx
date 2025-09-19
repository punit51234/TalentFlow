import React, { useState, useEffect } from "react";

function SkillsTagsInput({ tags = [], onTagsChange }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();
    if (value && !tags.includes(value)) {
      onTagsChange([...tags, value]);
      setInput("");
    }
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (target) => {
    onTagsChange(tags.filter((tag) => tag !== target));
  };

  useEffect(() => {
    setInput("");
  }, [tags]);

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">
        Skills &amp; Tags
      </label>
      <div className="flex">
        <input
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          placeholder="Add a skill or tag"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onInputKeyDown}
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-600 text-xl font-bold"
        >
          +
        </button>
      </div>
      {/* Display tags */}
      <div className="flex flex-wrap mt-3 gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
              title="Remove"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsTagsInput;