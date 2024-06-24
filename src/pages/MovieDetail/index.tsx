import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "../../apis/moviesApi";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ?? "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => fetchMovieDetail(movieId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  const {
    title,

    poster,
    classification,
    released_on,
    genres,
    imdb_rating,
    length,
    overview,
    cast,
    director,
  } = data!;

  const details = [
    {
      label: "Director",
      value: director ?? "",
    },
    {
      label: "Release On",
      value: new Date(released_on).toLocaleDateString(),
    },
    { label: "Genres", value: genres.map((genre) => genre).join(", ") },
    { label: "Classification", value: `${classification}` },
    { label: "Runtime", value: `${length}` },
    { label: "Cast", value: cast?.map((cast) => cast).join(", ") },
    { label: "Rating", value: imdb_rating },
    { label: "Overview", value: overview },
  ];

  return (
    <div className="box-container mb-8">
      <h1 className="h2">Movie Details</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <img src={`${poster}`} alt={title} />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="h1">{title}</h1>
          {details.map((detail) => (
            <p key={detail.label} className="body-lg text-gray-600">
              <strong>{detail.label}:</strong> {detail.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
