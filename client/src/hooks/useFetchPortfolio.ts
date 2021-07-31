import { useEffect, useState } from 'react';
import { PortfolioData } from '../types';

interface PortfolioValues {
  paid: number;
  value: number;
  profit: number;
}

export function useFetchPortfolio(
  id: number
): [PortfolioData[], PortfolioValues, boolean, string] {
  const [portfolioData, setPortfolioData] = useState<PortfolioData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [sums, setSums] = useState<PortfolioValues>({
    paid: 0,
    value: 0,
    profit: 0,
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      const response = await fetch(`/portfolio/${id}`);
      if (response.status === 200) {
        const portfolio = await response.json();
        const [paid, value] = portfolio.reduce(
          (acc: [number, number], { price, currentPrice }: PortfolioData) => {
            return [
              acc[0] + parseFloat(price),
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
    };
    fetchPortfolio();
    return () => {};
  }, [id]);

  return [portfolioData, sums, isLoading, error];
}
