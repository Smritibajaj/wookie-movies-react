import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieCard from './index';
import { Movie } from '../../constants/types';

const mockMovie: Movie = {
  id: '1',
  title: 'First Movie',
  backdrop: 'https://example.com/backdrop1.jpg',
  released_on: '2021-01-01',
  overview: 'Overview of the first movie. This is a longer text to test the expand functionality.',
  cast: [],
  classification: '',
  director: '',
  genres: [],
  imdb_rating: 0,
  length: '',
  poster: '',
  slug: '',
};

describe('MovieCard', () => {

  it('should toggle overview text on button click', () => {
    render(
      <Router>
        <MovieCard {...mockMovie} />
      </Router>
    );

    const button = screen.getByText(/Read More/i);
    fireEvent.click(button);
    expect(screen.getByText(/Read Less/i)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText(/Read More/i)).toBeInTheDocument();
  });

  it('should navigate to movie detail page on card click', () => {
    render(
      <Router>
        <MovieCard {...mockMovie} />
      </Router>
    );

    const link = screen.getByRole('link', { name: /First Movie/i });
    expect(link).toHaveAttribute('href', `/movie/${mockMovie.id}`);
  });
});
