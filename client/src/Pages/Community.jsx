import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
export default function Community() {
  const [creations, setCreations] = useState([]);
  const [likes, setLikes] = useState({}); // Track liked state for each creation
  
  useEffect(() => {
    // Fetch creations from backend API
    axios.get("/getuser-creations")
      .then((res) => res.json())
      .then((data) => setCreations(data))
      .catch((err) => console.error("Error fetching creations:", err));
  }, []);

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle like/unlike
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8">Community Creations</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creations.map((creation) => (
          <div
            key={creation._id}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col"
          >
            {/* Image */}
            {creation.image && (
              <img
                src={creation.image}
                alt={creation.title}
                className="rounded-lg object-cover h-56 w-full"
              />
            )}

            {/* Title & Description */}
            <h2 className="text-xl font-semibold mt-4">{creation.title}</h2>
            <p className="text-gray-600 flex-1">{creation.description}</p>

            {/* Like Button */}
            <div className="mt-4 flex items-center">
              <button
                onClick={() => toggleLike(creation._id)}
                className="focus:outline-none"
              >
                <img
                  src={
                    likes[creation._id]
                      ? "https://cdn-icons-png.flaticon.com/512/833/833472.png" // Liked (heart filled)
                      : "https://cdn-icons-png.flaticon.com/512/1077/1077035.png" // Not liked (heart outline)
                  }
                  alt="like toggle"
                  className="w-8 h-8"
                />
              </button>
              <span className="ml-2 text-gray-700">
                {likes[creation._id] ? "Liked" : "Like"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

