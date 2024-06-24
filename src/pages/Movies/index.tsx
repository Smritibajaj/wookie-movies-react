import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import GenreSection from "../../components/GenreSection";
import { fetchMoviesByGenre } from "../../apis/moviesApi";

const groupMoviesByGenre = (movies: any[]) => {
  return movies.reduce((acc: { [key: string]: any[] }, movie: any) => {
    movie.genres.forEach((genre: string) => {
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(movie);
    });
    return acc;
  }, {});
};

const MoviesByGenre: React.FC = () => {
  const {
    data: allMovies,
    error: genresError,
    isLoading: genresLoading,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchMoviesByGenre,
  });

  const genres = useMemo(() => {
    return allMovies ? groupMoviesByGenre(allMovies.movies) : {};
  }, [allMovies]);

  if (genresLoading) return <div className="text-center">Loading genres...</div>;

  if (genresError)
    return (
      <div className="text-center text-red-500">
        Error: {(genresError as Error).message}
      </div>
    );

  return (
    <div className="space-y-8">
      {Object.keys(genres).map((genre) => (
        <GenreSection key={genre} name={genre} genre={genres[genre]} />
      ))}
    </div>
  );
};

export default MoviesByGenre;
