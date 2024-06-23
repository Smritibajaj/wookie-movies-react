import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "../../apis/moviesApi";
import { image_url } from "../../constants";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id ?? "", 10);

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
    poster_path,
    release_date,
    genres,
    runtime,
    vote_average,
    overview,
  } = data!;

  const details = [
    {
      label: "Release Date",
      value: new Date(release_date).toLocaleDateString(),
    },
    { label: "Genres", value: genres.map((genre) => genre.name).join(", ") },
    { label: "Runtime", value: `${runtime} minutes` },
    { label: "Rating", value: vote_average },
    { label: "Overview", value: overview },
  ];

  return (
    <div className="box-container mb-8">
      <h1 className="h2">Movie Details</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <img src={`${image_url}/t/p/w500${poster_path}`} alt={title} />
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
