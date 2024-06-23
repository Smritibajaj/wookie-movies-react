// src/SearchMovies.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../apis/moviesApi";
import MovieCard from "../../components/MovieCard.tsx";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

const SearchMovies: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["searchMovies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {data?.results.map((movie: Movie) => (
          <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          overview={movie.overview}
        />
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
