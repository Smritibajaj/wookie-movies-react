// src/App.tsx
import React from 'react';
import Movies from './pages/Movies';
import SearchMovies from './pages/Movies/SearchMovie';

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Thikkiiana City Movie Theater</h1>
      <SearchMovies />
      <Movies />
    </div>
  );
};

export default App;
