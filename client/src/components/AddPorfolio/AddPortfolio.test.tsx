import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddPortfolio } from './AddPortfolio';

test('renders learn react link', () => {
  render(<AddPortfolio />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
