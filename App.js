import React from 'react';
import { Header, Footer, MainContent } from './components';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
