import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const MemeText = () => {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState("Double Click To Edit");
  const [fontSize, setFontSize] = useState(16); // Initial font size in pixels
  const [fontColor, setFontColor] = useState("#000000"); // Initial font color
  const [isBold, setIsBold] = useState(false); // Track bold state
  const [isItalic, setIsItalic] = useState(false); // Track italic state
  const inputRef = useRef(null);
  const [preventBlur, setPreventBlur] = useState(false);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode,preventBlur]);

  const handleBlur = () => {
    if (!preventBlur) {
      if (inputRef.current) {
        setVal(inputRef.current.innerText);
      }
      setEditMode(false);
    }
    setPreventBlur(false);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setPreventBlur(true);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setPreventBlur(false);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); // Increase font size by 2px
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 8)); // Decrease font size by 2px, with a minimum of 8px
  };

  const handleColorChange = (e) => {
    setFontColor(e.target.value);
  };

  const toggleBold = () => {
    setIsBold((prev) => !prev);
  };

  const toggleItalic = () => {
    setIsItalic((prev) => !prev);
  };

  return (
    <Draggable disabled={editMode}>
      <div className="absolute flex flex-col items-center">
        {editMode ? (
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-16 flex space-x-2 gap-4 bg-gray-100 p-4  rounded-lg shadow-md">
              <button
                className="w-6 h-6 bg-blue-500 text-white  rounded hover:bg-blue-600 focus:outline-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={increaseFontSize}
              >
                +
              </button>
              <button
                className="w-6 h-6 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={decreaseFontSize}
              >
                -
              </button>
              <button
                className={`w-6 h-6 rounded ${isBold ? 'bg-gray-800 text-white' : 'bg-gray-300'} hover:bg-gray-400 focus:outline-none`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={toggleBold}
              >
                <b>B</b>
              </button>
              <button
                className={`w-6 h-6 rounded ${isItalic ? 'bg-gray-800 text-white' : 'bg-gray-300'} hover:bg-gray-400 focus:outline-none`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={toggleItalic}
              >
                <i>I</i>
              </button>
              <input
                type="color"
                className="w-6 h-6 border rounded-md cursor-pointer"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onChange={handleColorChange}
              />
            </div>
            <div
              ref={inputRef}
              contentEditable
              suppressContentEditableWarning={true}
              className="bg-transparent whitespace-pre-wrap p-2 border border-gray-300 cursor-text rounded-lg shadow-inner"
              style={{ fontSize: `${fontSize}px`, 
              color: fontColor ,
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal' }}
              onBlur={handleBlur}
            >
              {val}
            </div>
          </div>
        ) : (
          <div
            onDoubleClick={() => setEditMode(true)}
            className="whitespace-pre-wrap cursor-pointer p-2 "
            style={{ fontSize: `${fontSize}px`,
            color: fontColor ,
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal'
          }}
          >
            {val}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default MemeText;
