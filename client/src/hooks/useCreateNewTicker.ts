import { useState } from 'react';
import { addStockToPortfolio } from '../lib/fetch';
import { NewTicker } from '../types';

export function useCreateNewTicker(): {
  postNewTicker: (
    portfolioId: number,
    stock: NewTicker,
    cb: () => void
  ) => Promise<void>;
  warning: string;
  setWarning: React.Dispatch<React.SetStateAction<string>>;
} {
  const [warning, setWarning] = useState('');

  const postNewTicker = async (
    portfolioId: number,
    stock: NewTicker,
    cb: () => void
  ) => {
    const result = await addStockToPortfolio(portfolioId, stock);

    if (result.status === 404 || result.status === 400) {
      const data = await result.json();
      setWarning(data.message);
      return;
    }
    if (result.status === 500) {
      setWarning('Something Went Wrong Please Try Again Later');
      return;
    }
    setWarning('');
    cb();
  };
  return { postNewTicker, warning, setWarning };
}
