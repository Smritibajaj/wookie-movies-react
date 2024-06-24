import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { vi } from 'vitest';
import MoviesByGenre from './index';

// Mocking the moviesApi and the useQuery hook
vi.mock('../../apis/moviesApi', () => ({
  fetchMoviesByGenre: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

const mockMovies = {
  movies: [
    {
      backdrop: 'https://example.com/backdrop1.jpg',
      cast: ['Actor 1', 'Actor 2'],
      classification: 'PG-13',
      director: 'Director 1',
      genres: ['Action', 'Adventure'],
      id: '1',
      imdb_rating: 8.5,
      length: '2h 30min',
      overview: 'Overview of the first movie.',
      poster: 'https://example.com/poster1.jpg',
      released_on: '2021-01-01',
      slug: 'first-movie',
      title: 'First Movie',
    },
    {
      backdrop: 'https://example.com/backdrop2.jpg',
      cast: ['Actor 3', 'Actor 4'],
      classification: 'R',
      director: 'Director 2',
      genres: ['Drama'],
      id: '2',
      imdb_rating: 9.0,
      length: '2h 00min',
      overview: 'Overview of the second movie.',
      poster: 'https://example.com/poster2.jpg',
      released_on: '2021-02-01',
      slug: 'second-movie',
      title: 'Second Movie',
    },
  ],
};

describe('MoviesByGenre', () => {
  beforeEach(() => {
    (useQuery as vi.Mock).mockReturnValue({
      data: mockMovies,
      error: null,
      isLoading: false,
    });
  });

  it('should render loading state', () => {
    (useQuery as vi.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });
    render(<MoviesByGenre />);
    const loading = screen.getByText(/loading genres/i);
    expect(loading).toBeInTheDocument();
  });

  it('should render error state', () => {
    (useQuery as vi.Mock).mockReturnValue({
      data: null,
      error: { message: 'Error fetching genres' },
      isLoading: false,
    });
    render(<MoviesByGenre />);
    const error = screen.getByText(/error: error fetching genres/i);
    expect(error).toBeInTheDocument();
  });
});
