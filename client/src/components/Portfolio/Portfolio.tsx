import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetchPortfolio } from '../../hooks/useFetchPortfolio';
import { AddTicker } from '../AddTicker/AddTicker';
import { TickerList } from './TickerList';

interface Props {
  name: string | undefined;
  id?: number;
}
export default function Portfolio({ name, id = 0 }: Props): React.ReactElement {
  const [portfolioData, sums, isLoading, error, inUpdate, setInUpdate] =
    useFetchPortfolio(id);
  const history = useHistory();
  const deletePortfolio = async () => {
    await fetch(`/portfolio/${id}`, {
      method: 'DELETE',
    });
    history.push('/');
  };

  return (
    <div>
      <h3>{name}</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : error.length !== 0 ? (
        <div>{error}</div>
      ) : (
        <div>
          <TickerList tickerList={portfolioData} />
          <div>
            <div>{`Total Paid: $${sums.paid}`}</div>
            <div>{`Current Value: $${sums.value}`}</div>
            <div>{`Total Profit: $${sums.profit}`}</div>
          </div>
        </div>
      )}
      {inUpdate ? (
        <AddTicker portfolioId={id} setShowAddForm={setInUpdate} />
      ) : (
        <button onClick={() => setInUpdate(true)}>Add Stock</button>
      )}
      <button onClick={deletePortfolio}>Delete</button>
    </div>
  );
}
