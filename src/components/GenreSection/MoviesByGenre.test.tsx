import { render, screen } from '@testing-library/react';
import GenreSection from './index';


describe('GenreSection', () => {

  it('should handle empty genre list', () => {
    render(<GenreSection name="Action" genre={[]} />);
    const genreName = screen.getByText(/Action/i);
    expect(genreName).toBeInTheDocument();
    expect(screen.queryByAltText(/Overview of the first movie./i)).not.toBeInTheDocument();
  });
});
