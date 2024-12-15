import React from 'react';
import { NavLink } from 'react-router-dom';

const Tile = ({ title, description, link ,onClick}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <NavLink to={link} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
          View
        </NavLink>
      </div>
    </div>
  );
};

export default Tile;
