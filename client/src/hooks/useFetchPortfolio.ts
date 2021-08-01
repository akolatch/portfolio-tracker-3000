import { useCallback, useEffect, useState } from 'react';
import { PortfolioData, TickerData } from '../types';

interface PortfolioValues {
  paid: number;
  value: number;
  profit: number;
}

export function useFetchPortfolio(
  id: number
): [PortfolioData, () => Promise<void>, PortfolioValues, boolean, string] {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [sums, setSums] = useState<PortfolioValues>({
    paid: 0,
    value: 0,
    profit: 0,
  });

  const fetchPortfolio = useCallback(async () => {
    const response = await fetch(`/portfolio/${id}`);
    if (response.status === 200) {
      const portfolio = await response.json();
      const [paid, value] = portfolio.reduce(
        (acc: [number, number], { pricePaid, currentPrice }: TickerData) => {
          return [
            acc[0] + parseFloat(pricePaid),
            acc[1] + parseFloat(currentPrice),
          ];
        },
        [0, 0]
      );
      setSums({ paid, value, profit: value - paid });
      setPortfolioData(portfolio);
      setError('');
    } else if (response.status === 404) {
      setError('Start Adding Stocks');
    } else {
      setError('Slow Down');
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPortfolio();
    return () => {};
  }, [id, fetchPortfolio]);

  return [portfolioData, fetchPortfolio, sums, isLoading, error];
}
