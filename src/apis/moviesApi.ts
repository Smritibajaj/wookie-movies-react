// src/api.ts
import { Movie } from '../constants/types';
import axiosInstance from '../utils/axiosInstance';

interface MoviesResponse {
  movies: Movie[];
}

export const fetchMoviesByGenre = async (): Promise<MoviesResponse> => {
  const response = await axiosInstance.get<MoviesResponse>('/movies', {
  });
  return response.data;
};

export const searchMovies = async (query: string): Promise<MoviesResponse> => {
  const response = await axiosInstance.get<MoviesResponse>('/movies', {
    params: {
      q:query,
    },
  });
  return response.data;
};

export const fetchMovieDetail = async (movieId: string): Promise<Movie> => {
  const response = await axiosInstance.get<Movie>(`/movies/${movieId}`);
  return response.data;
};
