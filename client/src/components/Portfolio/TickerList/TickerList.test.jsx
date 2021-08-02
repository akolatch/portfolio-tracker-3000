import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { TickerList } from './TickerList';

describe('TickerListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render list of stocks', () => {
    const { getByText } = render(
      <TickerList
        tickerList={[
          {
            id: 1,
            symbol: 'IBM',
            currentPrice: '140.9600',
            numShares: 30,
            pricePaid: '100.00',
            purchaseDate: '2021-07-31',
          },
          {
            id: 2,
            symbol: 'HAS',
            currentPrice: '99.4400',
            numShares: 15,
            pricePaid: '75.00',
            purchaseDate: '2021-07-31',
          },
        ]}
      />
    );
    const tickerListItem = getByText('SYMBOL');
    const IBM = screen.getByTestId('IBM');
    const HAS = screen.getByTestId('HAS');
    expect(tickerListItem).toBeInTheDocument();
    expect(IBM).toBeInTheDocument();
    expect(HAS).toBeInTheDocument();
  });

  it('should render list of stocks', () => {
    const { getByText } = render(
      <TickerList
        tickerList={[
          {
            id: 1,
            symbol: 'IBM',
            currentPrice: '140.9600',
            numShares: 30,
            pricePaid: '100.00',
            purchaseDate: '2021-07-31',
          },
          {
            id: 2,
            symbol: 'HAS',
            currentPrice: '99.4400',
            numShares: 15,
            pricePaid: '75.00',
            purchaseDate: '2021-07-31',
          },
        ]}
      />
    );
    const tickerListItem = getByText('SYMBOL');
    const IBM = screen.getByTestId('IBM');
    const HAS = screen.getByTestId('HAS');
    expect(tickerListItem).toBeInTheDocument();
    expect(IBM).toBeInTheDocument();
    expect(HAS).toBeInTheDocument();
  });
});
