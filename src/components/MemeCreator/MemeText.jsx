import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const MemeText = () => {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState("Double Click To Edit");
  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBlur = () => {
    if (inputRef.current) {
      setVal(inputRef.current.innerText);
    }
    setEditMode(false);
  };

  return (
    <Draggable disabled={editMode} >
      <div className="absolute top-0 left-0  flex flex-col">
          {/* <strong className="cursor absolute -top-6 left-0">
              <span role="img" aria-label="move">🔄</span>
            </strong> */}
        {editMode ? (
          <div
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning={true}
            className="bg-transparent whitespace-pre-wrap p-1 border border-gray-300 cursor-pointer"
            onBlur={handleBlur}
          >
            {val}
          </div>
        ) : (
          <div
            onDoubleClick={() => setEditMode(true)}
            className="whitespace-pre-wrap cursor-pointer "
          >
            {val}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default MemeText;
