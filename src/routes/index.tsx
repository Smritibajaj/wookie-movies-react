import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchMovies from "../components/SearchSection";
const App = lazy(() => import("../App"));
const MovieDetail = lazy(() => import("../pages/MovieDetail"));

const AppRoutes: React.FC = () => {
  return (
    <>
      <Router>
        <SearchMovies />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default AppRoutes;
