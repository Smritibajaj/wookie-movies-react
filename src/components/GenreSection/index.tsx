// src/MoviesByGenre.tsx
import React from "react";
import MovieCard from "../../components/MovieCard.tsx";
import { GenreSectionProps, Movie } from "../../constants/types.tsx";

const GenreSection: React.FC<GenreSectionProps> = ({
  name,
  genre,
}) => {
  return (
    <div className="border-b border-gray-300">
      <h2 className="h2">{name}</h2>
      <div className="flex gap-4 overflow-auto pb-4">
        {genre?.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            backdrop={movie.backdrop}
            released_on={movie.released_on}
            overview={movie.overview}
            poster={movie.poster}
            classification={movie.classification}
            length={movie.length}
            imdb_rating={movie.imdb_rating}
            cast={movie.cast}
            genres={movie.genres}
          />
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
