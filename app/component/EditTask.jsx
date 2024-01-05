import React, { useState } from "react";

export const EditTask = ({ onCancel, task, onUpdate }) => {
  const [text, setText] = useState(task.text);

  const toggleCancel = () => {
    onCancel();
  };

  const toggleUpdate = () => {
    onUpdate(text);
  };
  return (
    <div>
      <div className="md:flex justify-center items-center text-center">
        <input
          className="border rounded-sm md:p-[5px] p-1 text-xs md:text-sm"
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-center items-center py-1">
          <button
            onClick={toggleUpdate}
            className="text-emerald-500 font-medium text-xs md:text-sm px-1"
          >
            Update
          </button>
          <button
            onClick={toggleCancel}
            className="text-rose-500 font-medium text-xs md:text-sm px-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
