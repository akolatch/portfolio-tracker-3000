import { useState } from 'react';
import { TickerUpdates } from '../types';

export function useUpdateTicker() {
  const [warning, setWarning] = useState('');

  const updateTicker = async (
    id: number,
    updates: TickerUpdates,
    cb: (param: boolean) => void
  ) => {
    const result = await fetch(`/ticker/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
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
    cb(false);
  };
  return { updateTicker, warning, setWarning };
}