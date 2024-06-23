// src/MoviesByGenre.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../../apis/moviesApi";
import GenreSection from "../../components/GenreSection/index.tsx";

interface Genre {
  id: number;
  name: string;
}

const MoviesByGenre: React.FC = () => {
  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  if (genresLoading)
    return <div className="text-center">Loading genres...</div>;
  if (genresError)
    return (
      <div className="text-center text-red-500">
        Error: {genresError.message}
      </div>
    );

  return (
    <div className="space-y-8">
      {genres?.genres.map((genre: Genre) => (
        <GenreSection key={genre.id} genre={genre} />
      ))}
    </div>
  );
};

export default MoviesByGenre;
