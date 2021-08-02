import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
} from '@testing-library/react';
import { Portfolio } from './Portfolio';


global.fetch = jest.fn();

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
