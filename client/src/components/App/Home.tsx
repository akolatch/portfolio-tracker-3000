import React, { useEffect, useState } from 'react';
import { TPortfolio } from '../../types';

interface Props {
  setPortfolioList: React.Dispatch<React.SetStateAction<TPortfolio[]>>;
}

export default function Home({ setPortfolioList }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPortfolioList = async () => {
      const response = await fetch('/portfolio');
      const data = await response.json();
      setPortfolioList(data);
      setIsLoading(false);
    };
    fetchPortfolioList();
  }, []);

  return <div>{isLoading && 'Loading...'}</div>;
}
