import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchMovies from './index';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('SearchMovies', () => {
  test('renders search input and header', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SearchMovies />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByPlaceholderText(/search for a movie/i)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SearchMovies />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText(/search for a movie/i);
    fireEvent.change(input, { target: { value: 'Inception' } });

    expect(input).toHaveValue('Inception');
  });

  test('shows loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SearchMovies />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText(/search for a movie/i);
    fireEvent.change(input, { target: { value: 'Inception' } });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});