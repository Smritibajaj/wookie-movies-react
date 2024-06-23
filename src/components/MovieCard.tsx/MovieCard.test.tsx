import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from './index';

const mockMovie = {
  id: 1,
  title: 'Inception',
  poster_path: '/inception.jpg',
  release_date: '2010-07-16',
  overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
};

describe('MovieCard', () => {
  test('renders movie details', () => {
    render(
      <BrowserRouter>
        <MovieCard {...mockMovie} />
      </BrowserRouter>
    );

    expect(screen.getByAltText(/inception/i)).toBeInTheDocument();
    expect(screen.getByText(/inception/i)).toBeInTheDocument();
    expect(screen.getByText(/release date/i)).toBeInTheDocument();
    expect(screen.getByText(/a thief who steals corporate secrets/i)).toBeInTheDocument();
  });

  test('toggles overview text expansion', () => {
    render(
      <BrowserRouter>
        <MovieCard {...mockMovie} />
      </BrowserRouter>
    );

    const button = screen.getByText(/read more/i);
    fireEvent.click(button);
    expect(screen.getByText(/read less/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText(/read more/i)).toBeInTheDocument();
  });

  test('navigates to movie detail page on link click', () => {
    render(
      <BrowserRouter>
        <MovieCard {...mockMovie} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: /inception/i });
    expect(link).toHaveAttribute('href', '/movie/1');
  });
});