// src/MoviesByGenre.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenre, fetchGenres } from "../../apis/moviesApi";
import MovieCard from "../../components/MovieCard.tsx";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

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

  if (genresLoading) return <div>Loading genres...</div>;
  if (genresError) return <div>Error: {genresError.message}</div>;

  return (
    <div>
      {genres?.genres.map((genre: Genre) => (
        <GenreSection key={genre.id} genre={genre} />
      ))}
    </div>
  );
};

const GenreSection: React.FC<{ genre: Genre }> = ({ genre }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["moviesByGenre", genre.id],
    queryFn: () => fetchMoviesByGenre(genre.id),
  });

  if (isLoading) return <div>Loading movies for {genre.name}...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{genre.name}</h2>
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

export default MoviesByGenre;
