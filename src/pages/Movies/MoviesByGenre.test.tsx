// src/pages/Movies/MoviesByGenre.test.tsx
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MoviesByGenre from '../../components/GenreSection';
import { fetchGenres } from '../../apis/moviesApi';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, vi } from 'vitest';

vi.mock('../../apis/moviesApi');

const mockFetchGenres = fetchGenres as any;
const genre = { id: 1, name: 'Action' };
const queryClient = new QueryClient();

describe('MoviesByGenre', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test('renders loading state initially', () => {
    mockFetchGenres.mockReturnValue(new Promise(() => {}));
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MoviesByGenre genre={genre} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Action/i)).toBeInTheDocument();
  });
});
