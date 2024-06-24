import { render, screen } from '@testing-library/react';
import GenreSection from './index';
import { Movie } from '../../constants/types';

const mockMovies: Movie[] = [
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
];

describe('GenreSection', () => {

  it('should handle empty genre list', () => {
    render(<GenreSection name="Action" genre={[]} />);
    const genreName = screen.getByText(/Action/i);
    expect(genreName).toBeInTheDocument();
    expect(screen.queryByAltText(/Overview of the first movie./i)).not.toBeInTheDocument();
  });
});
