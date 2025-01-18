import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = ({ onImageSelect }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const encodedQuery = encodeURIComponent(query); 
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${encodedQuery}&per_page=20`, // Adjust how many images you wanted in my case their is 20.
        {
          headers: {
            Authorization: 'YOUR_API', // Write your api key here.
          },
        }
      );
      setImages(response.data.photos); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="p-4">
     
      <div className="mb-4 text-center">
        <p className="font-bold">Name: Harshit Nigam</p>
        <p>Email: hnigam596@example.com</p>
      </div>
        {/* Search Bar */}
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

    
      <div className="grid grid-cols-4 gap-4 mt-4">
        {images.map((image) => (
          <div key={image.id} className="border p-2 text-center">
            <img
              src={image.src.medium}
              alt={image.alt}
              className="w-full"
              onClick={() => onImageSelect(image.src.large)}
            />
            <button
              className="bg-green-500 text-white mt-2 px-4 py-2"
              onClick={() => onImageSelect(image.src.large)}
            >
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
