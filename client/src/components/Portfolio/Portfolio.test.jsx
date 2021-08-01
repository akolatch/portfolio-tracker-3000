import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
} from '@testing-library/react';
import { Portfolio } from './Portfolio';
import { BrowserRouter as Router } from 'react-router-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          ticker: 'IBM',
          currentPrice: '140.9600',
          numShares: 30,
          pricePaid: '100.00',
          purchaseDate: '2021-07-31',
        },
        {
          id: 2,
          ticker: 'HAS',
          currentPrice: '99.4400',
          numShares: 15,
          pricePaid: '75.00',
          purchaseDate: '2021-07-31',
        },
      ]),
    status: 200,
  })
);

describe('Portfolio', () => {
  afterEach(cleanup);

  it('renders AddPortfolio', async () => {
    await waitFor(() => {
      render(<Portfolio name='test' id={130} />);
    });
    const linkElement = screen.getByTestId('portfolio-container');
    expect(linkElement).toBeInTheDocument();
  });
});
