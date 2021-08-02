import { useState } from 'react';
import { updateStock } from '../lib/fetch';
import { TickerUpdates } from '../types';

export function useUpdateTicker() {
  const [warning, setWarning] = useState('');

  const updateTicker = async (
    id: number,
    updates: TickerUpdates,
    cb: () => void
  ) => {
    const result = await updateStock(id, updates);
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
  return { updateTicker, warning, setWarning };
}
