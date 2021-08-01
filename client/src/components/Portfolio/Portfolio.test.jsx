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

global.fetch = jest.fn(() => {
  return Promise.resolve({
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
  });
});

describe('Portfolio', () => {
  afterEach(cleanup);

  it('renders AddPortfolio', async () => {
    await waitFor(() => {
      render(<Portfolio name='test' id={130} />);
    });
    const linkElement = screen.getByTestId('portfolio-container');
    expect(linkElement).toBeInTheDocument();
  });

  it('open add stock form', async () => {
    await waitFor(() => {
      render(<Portfolio name='test' id={130} />);
    });
    const openButton = screen.getByTestId('open-add-stock-form');
    expect(openButton).toBeInTheDocument();
    await fireEvent.click(openButton);
    const addStockForm = screen.getByTestId('add-ticker-container');
    expect(addStockForm).toBeInTheDocument();
  });
  it('close add stock form when you click outside form', async () => {
    await waitFor(() => {
      render(<Portfolio name='test' id={130} />);
    });
    const openButton = screen.getByTestId('open-add-stock-form');
    expect(openButton).toBeInTheDocument();
    await fireEvent.click(openButton);
    const addStockForm = screen.getByTestId('add-ticker-container');
    expect(addStockForm).toBeInTheDocument();
    await fireEvent.click(addStockForm);
    expect(addStockForm).not.toBeInTheDocument();
  });
  it('close add stock form when you click close button', async () => {
    await waitFor(() => {
      render(<Portfolio name='test' id={130} />);
    });
    const openButton = screen.getByTestId('open-add-stock-form');
    expect(openButton).toBeInTheDocument();
    await fireEvent.click(openButton);
    const closeButton = screen.getByTestId('close-button');
    expect(closeButton).toBeInTheDocument();
    await fireEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should not close when clicking on the form', async () => {
    await waitFor(() => {
      render(<Portfolio name='test' id={130} />);
    });
    const openButton = screen.getByTestId('open-add-stock-form');
    expect(openButton).toBeInTheDocument();
    await fireEvent.click(openButton);
    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
    await fireEvent.click(form);
    expect(form).toBeInTheDocument();
  });
});
