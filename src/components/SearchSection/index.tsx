// src/SearchMovies.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../apis/moviesApi.ts";
import MovieCard from "../MovieCard.tsx/index.tsx";
import Header from "../Header/index.tsx";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Movie } from "../../constants/types.tsx";

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
      <div className="w-full h-28 md:h-16 border-b">
        <div className="box-container md:flex md:justify-between items-center h-full">
          <Header />
          <div className="flex items-center border px-2 gap-2 py-1 rounded">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
            <input
              className="my-2 focus:outline-none focus:border-none w-4/5"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for a movie..."
            />
            <button onClick={() => setQuery("")}>
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`box-container ${
          data?.movies?.length ? "my-4 border-b border-gray-300" : ""
        }`}
      >
        {data?.movies?.length ? (
          <h2 className="h2">{`Search Result`}</h2>
        ) : (
          <></>
        )}
        <div className="flex w-full gap-6 overflow-auto my-6">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {data?.movies?.map((movie: Movie) => (
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
              genres={movie.genres}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchMovies;
