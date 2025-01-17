import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = ({ onImageSelect }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const encodedQuery = encodeURIComponent(query); // Encoding the query
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${encodedQuery}&per_page=10`, 
        {
          headers: {
            Authorization: '6bxtOfwbtwj4aAIjVLHXvhywneg43XDwQVL8PhdyvRdaVHJ72I4SAdG4' // Pexels API key
          }
        }
      );
      setImages(response.data.photos); // 'photos' contains the images from Pexels
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Search for images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((image) => (
          <div key={image.id} className="border p-2">
            <img
              src={image.src.medium}
              alt={image.alt}
              className="w-full"
              onClick={() => onImageSelect(image.src.large)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
