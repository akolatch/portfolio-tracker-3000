import React, { useEffect, useState } from 'react';
import { PortfolioDetails } from '../../types';

interface Props {
  setPortfolioList: React.Dispatch<React.SetStateAction<PortfolioDetails[]>>;
}

export function Loading({ setPortfolioList }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPortfolioList = async () => {
      const response = await fetch('/portfolio');
      const data = await response.json();

      setPortfolioList(data);
      setIsLoading(false);
    };
    fetchPortfolioList();
  }, [setPortfolioList]);

  return <div>{isLoading && 'Loading...'}</div>;
}
