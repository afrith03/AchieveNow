"use client";
import React, { useState, useEffect } from "react";

const RandomActressImages = () => {
  const [actressImages, setActressImages] = useState([]);
  const [queryInput, setqueryInput] = useState("");
  const apiKey = "goCO1RdCjhbGKPeHUyXUUnIbN3qAfyrYMQ1zmDCu0Iw";

  useEffect(() => {
    fetchRandomActressImages();
  }, []);

  const fetchRandomActressImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${queryInput}&orientation=portrait&per_page=30&client_id=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setActressImages(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
  
      <div className="image-list flex flex-col items-center gap-6 mt-4">
        <div className="carousel carousel-center rounded-box w-[80%] h-96">
          {actressImages.map((image) => (
            <div className="carousel-item">
              <img
                key={image.id}
                src={image.urls.regular}
                alt={image.alt_description || "Actress"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
       <div className="flex">
       <input
          type="text"
          placeholder="Type here"
          value={queryInput}
          onChange={(e) => {
            setqueryInput(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button
          onClick={() => {
            fetchRandomActressImages();
          }}
          className="btn mx-3 btn-outline btn-primary"
        >
          Search
        </button>
       </div>
      </div>
    </div>
  );
};

export default RandomActressImages;
