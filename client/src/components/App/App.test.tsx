import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import App from './App';
import { debug } from 'console';

describe('App', () => {
  afterEach(cleanup);

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByTestId('app');
    expect(linkElement).toBeInTheDocument();
  });

  test('opens add form when add form button clicked', async () => {
    render(<App />);
    const addButton = screen.getByTestId('open-add-form');
    await waitFor(() => fireEvent.click(addButton));
    debug();
    const addForm = screen.getByTestId('add-portfolio');
    expect(addForm).toBeInTheDocument();
  });
});
