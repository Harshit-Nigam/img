import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageSearch from './components/ImageSearch';
import CanvasEditor from './components/CanvasEditor';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {!selectedImage ? (
          <ImageSearch onImageSelect={setSelectedImage} />
        ) : (
          <CanvasEditor selectedImage={selectedImage} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
