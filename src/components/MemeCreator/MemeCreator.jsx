import React, { useEffect, useState } from "react";
import { getAllMemes } from "../api/memes";
import { MemeCard } from "./MemeCard";
import { Outlet } from "react-router-dom";

 function MemeCreator () {
  const [data, setData] = useState([]);
  const [editMeme ,setEditMeme]= useState(false);
   console.log("meme creator")
  useEffect(() => {
    getAllMemes().then((res) => setData(res.data.memes));
  }, []);

  const handleEditMeme= ()=>{
    setEditMeme(true);
  }
  return (
    <>
      {
        editMeme ? <Outlet /> :
        <div className="flex flex-wrap gap-4 justify-evenly items-center"> 
        {data.map((e, idx) => (
          <div key={idx}>
            <MemeCard img={e.url} title={e.name} handleEditMeme={handleEditMeme} />
          </div>
        ))}
          
      </div>
      }
    
    </>
  );
}

export default MemeCreator;