import React from "react";
import { useNavigate } from 'react-router-dom';

export function MemeCard(props) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    props.handleEditMeme();
    navigate(`edit/?url=${props.img}`);
  };

  return (
    <div className="flex flex-col w-72 h-100 max-w-sm rounded overflow-hidden shadow-lg items-center justify-center py-5">
      <img className="w-full h-64 object-cover" src={props.img} alt={props.title} />
      <div className="px-6 py-4 font-bold text-xl mb-2 text-center">{props.title}</div>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleEditClick}
      >
        Edit
      </button>
    </div>
  );
}
