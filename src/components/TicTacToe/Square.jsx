import React from 'react';

function Square(props) {
    return (
        <div
          className=" w-40 h-40 bg-gray-200 border-2 border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition duration-300"
          onClick={props.onClick}
        >
          <h1 className="text-2xl font-bold text-black">{props.value}</h1>
        </div>
      );
}

export default Square;