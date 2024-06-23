// src/MoviesByGenre.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenre } from "../../apis/moviesApi";
import MovieCard from "../../components/MovieCard.tsx";
import { Genre, Movie } from "../../constants/types.tsx";

const GenreSection: React.FC<{ genre: Genre }> = ({ genre }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["moviesByGenre", genre.id],
    queryFn: () => fetchMoviesByGenre(genre.id),
  });

  if (isLoading)
    return (
      <div className="text-center">Loading movies for {genre.name}...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="border-b border-gray-300">
      <h2 className="h2">{genre.name}</h2>
      <div className="flex gap-4 overflow-auto pb-4">
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

export default GenreSection;
