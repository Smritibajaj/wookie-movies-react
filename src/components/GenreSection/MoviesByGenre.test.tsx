import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GenreSection from './index';
import { fetchMoviesByGenre } from '../../apis/moviesApi';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../apis/moviesApi');

const mockFetchMoviesByGenre = fetchMoviesByGenre as vi.Mock;

const queryClient = new QueryClient();

const genre = { id: 1, name: 'Action' };

describe('GenreSection', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test('renders loading state initially', () => {
    mockFetchMoviesByGenre.mockReturnValue(new Promise(() => {}));
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GenreSection genre={genre} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading movies for action/i)).toBeInTheDocument();
  });

  test('renders movies for a genre', async () => {
    mockFetchMoviesByGenre.mockResolvedValueOnce({
      results: [
        {
          id: 1,
          title: 'Inception',
          overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
          poster_path: '/inception.jpg',
          release_date: '2010-07-16',
        },
      ],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GenreSection genre={genre} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/inception/i)).toBeInTheDocument();
    expect(screen.getByAltText(/inception/i)).toBeInTheDocument();
  });
});