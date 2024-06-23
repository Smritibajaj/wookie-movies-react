// src/MovieDetail.tsx
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
  const movieId = parseInt(id ?? '', 10);

  const { data, error, isLoading } = useQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => fetchMovieDetail(movieId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <img
        src={`${image_url}/t/p/w500${data?.poster_path}`}
        alt={data?.title}
        style={{ width: "300px" }}
      />
      <p>
        <strong>Release Date:</strong>{" "}
        {new Date(data?.release_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {data?.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>Runtime:</strong> {data?.runtime} minutes
      </p>
      <p>
        <strong>Rating:</strong> {data?.vote_average}
      </p>
      <p>{data?.overview}</p>
    </div>
  );
};

export default MovieDetail;
