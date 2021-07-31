import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetchPortfolio } from '../../hooks/useFetchPortfolio';
import { AddTicker } from './AddTicker/AddTicker';
import { TickerList } from './TickerList';

interface Props {
  name: string | undefined;
  id?: number;
}
export default function Portfolio({ name, id = 0 }: Props): React.ReactElement {
  const [portfolioData, setPortfolioData, sums, isLoading, error] =
    useFetchPortfolio(id);
  const [addStock, setAddStock] = useState(false);
  const history = useHistory();

  const closeAddForm = () => {
    setPortfolioData();
    setAddStock(false);
  };

  const deletePortfolio = async () => {
    await fetch(`/portfolio/${id}`, {
      method: 'DELETE',
    });
    history.push('/');
  };

  const deleteStock = async (tickerId: number) => {
    await fetch(`/ticker/${tickerId}`, {
      method: 'DELETE',
    });
    setPortfolioData();
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
          <TickerList tickerList={portfolioData} deleteStock={deleteStock} />
          <div>
            <div>{`Total Paid: $${sums.paid}`}</div>
            <div>{`Current Value: $${sums.value}`}</div>
            <div>{`Total Profit: $${sums.profit}`}</div>
          </div>
        </div>
      )}
      {addStock ? (
        <AddTicker portfolioId={id} closeAddForm={closeAddForm} />
      ) : (
        <button onClick={() => setAddStock(true)}>Add Stock</button>
      )}
      <button onClick={deletePortfolio}>Delete</button>
    </div>
  );
}
