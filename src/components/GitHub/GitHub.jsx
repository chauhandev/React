import React, { useState } from "react";

export default function GitHub() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    try {
      const api = `https://api.github.com/users/${username}`;
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
      setError("");
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center  bg-gray-100 p-6">
        <header className="bg-white shadow-md rounded p-6 text-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">GitHub User Fetcher</h1>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <button
            onClick={fetchUserData}
            className="bg-blue-500 text-white rounded p-2 w-full"
          >
            Fetch User Data
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {userData && (
            <div className="mt-4 p-4 bg-gray-200 rounded w-full text-left">
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <p>
                <strong>ID:</strong> {userData.id}
              </p>
              <p>
                <strong>Username:</strong>{" "}
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {userData.login}
                </a>
              </p>
              <p>
                <strong>Repositories URL:</strong>{" "}
                <a
                  href={userData.repos_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {userData.repos_url}
                </a>
              </p>
              <p>
                <strong>Location:</strong> {userData.location || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {userData.email || "N/A"}
              </p>
            </div>
          )}
        </header>
      </div>
    </>
  );
}
