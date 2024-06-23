// src/api.ts
import axiosInstance from '../utils/axiosInstance';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
}

interface MoviesResponse {
  results: Movie[];
}

interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

export const fetchGenres = async (): Promise<GenresResponse> => {
  const response = await axiosInstance.get<GenresResponse>('/genre/movie/list');
  return response.data;
};

export const fetchMoviesByGenre = async (genreId: number): Promise<MoviesResponse> => {
  const response = await axiosInstance.get<MoviesResponse>('/discover/movie', {
    params: {
      with_genres: genreId,
    },
  });
  return response.data;
};

export const searchMovies = async (query: string): Promise<MoviesResponse> => {
  const response = await axiosInstance.get<MoviesResponse>('/search/movie', {
    params: {
      query,
    },
  });
  return response.data;
};

export const fetchMovieDetail = async (movieId: number): Promise<Movie> => {
  const response = await axiosInstance.get<Movie>(`/movie/${movieId}`);
  return response.data;
};
