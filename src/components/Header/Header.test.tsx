import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
  test('renders the header with correct text', () => {
    render(<Header />);
    expect(screen.getByText(/wookie movies/i)).toBeInTheDocument();
  });
});