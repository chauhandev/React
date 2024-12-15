import React, { useEffect, useState, useRef, useCallback } from "react";
import { getAllMemes } from "../api/memes";
import { MemeCard } from "./MemeCard";
import { Outlet ,useLocation } from "react-router-dom";

function MemeCreator() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMeme, setEditMeme] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const observer = useRef();
  const location = useLocation();

  useEffect(() => {
    fetchMemes();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((meme) =>
        meme.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const res = await getAllMemes();
      setData((prevData) => [...prevData, ...res.data.memes]);
      setFilteredData((prevData) => [...prevData, ...res.data.memes]); // Initialize filteredData with all memes
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    // Update tileClicked based on the current location
    if (location.pathname === '/memecreator') {
        setEditMeme(false);
    } else {
      setEditMeme(true);
    }
}, [location.pathname]);


  const handleEditMeme = () => {
    setEditMeme(true);
  };

  const lastMemeRef = useCallback((node) => {
    if (loading || searchTerm) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
        fetchMemes();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, searchTerm]);

  return (
    <>
      {editMeme ? (
        <Outlet />
      ) : (
        <>
          <div className="w-full flex justify-center p-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search memes..."
              className="w-full max-w-lg p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-4 justify-evenly items-center">
            {filteredData.map((e, idx) => (
              <div key={idx} ref={!searchTerm && idx === filteredData.length - 1 ? lastMemeRef : null}>
                <MemeCard img={e.url} title={e.name} handleEditMeme={handleEditMeme} />
              </div>
            ))}
            {loading && <div className="loading-spinner">Loading...</div>}
          </div>
        </>
      )}
    </>
  );
}

export default MemeCreator;
