// EditMeme.jsx
import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import MemeText from './MemeText';
import { exportComponentAsJPEG } from 'react-component-export-image'

const EditMeme = () => {
  const [ count, setCount ] = useState(0);
  const [ searchParams ] = useSearchParams();
  const memeref = useRef();
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return <div>No image URL provided.</div>;
  }

  const addText = () => {
    setCount(count + 1);
  }

  const saveMeme = () => {
    exportComponentAsJPEG(memeref)
  }
  return (
    <div  className='w-max m-auto p-4 rounded-3xl flex flex-col justify-center items-center border-2 border-solid border-blue-500 select-none  bg-white'>
      <div className='relative'>
        <div ref={memeref} >
          <img className="w-96 h-96" src={imageUrl} alt="Meme to edit" />
          {Array(count).fill(0).map((e, idx) => {
            return <MemeText class key={idx} />
          })}
          {
            
          }
        </div>
        <div className='flex gap-4 justify-center mt-4'>
          <button
            className="w-24 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded align-top"
            onClick={addText} > Add Text
          </button>
          <button
            className="w-24 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded align-top"
            onClick={saveMeme} > Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMeme;
