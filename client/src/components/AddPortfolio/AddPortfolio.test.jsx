import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
} from '@testing-library/react';
import { AddPortfolio } from './AddPortfolio';
import { BrowserRouter as Router } from 'react-router-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('AddPortfolio', () => {
  afterEach(cleanup);

  it('renders AddPortfolio', () => {
    render(<AddPortfolio />);
    const linkElement = screen.getByTestId('add-portfolio');
    expect(linkElement).toBeInTheDocument();
  });

  it('rejects invalid form', () => {
    render(<AddPortfolio />);
    const linkElement = screen.getByTestId('submit-button');
    fireEvent.click(linkElement);
    const warning = screen.getByTestId('warning');
    expect(warning).toBeInTheDocument();
  });

  it('calls fetch when submitted', async () => {
    render(
      <Router>
        <AddPortfolio />
      </Router>
    );
    const form = screen.getByTestId('add-portfolio');
    expect(form).toBeInTheDocument();
    const linkElement = screen.getByTestId('name');
    const submit = screen.getByTestId('submit-button');
    fireEvent.change(linkElement, { target: { value: 'test' } });
    await waitFor(() => {
      fireEvent.click(submit);
    });
    expect(fetch).toHaveBeenCalled();
  });
});
