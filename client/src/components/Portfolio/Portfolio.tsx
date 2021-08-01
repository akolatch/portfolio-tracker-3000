import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetchPortfolio } from '../../hooks/useFetchPortfolio';
import { AddTicker } from './AddTicker/AddTicker';
import { TickerList } from './TickerList/TickerList';
import { Totals } from './Totals';
import './Portfolio.scss';
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

  // close add stock when switching between portfolios
  useEffect(() => {
    setAddStock(false);
    return () => {
      setAddStock(false);
    };
  }, [id]);

  return (
    <div className='portfolio-container'>
      <h2>{name}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error.length !== 0 ? (
        <div>{error}</div>
      ) : (
        <div>
          <TickerList tickerList={portfolioData} deleteStock={deleteStock} />
          <Totals sums={sums} />
        </div>
      )}
      {addStock ? (
        <AddTicker portfolioId={id} closeAddForm={closeAddForm} />
      ) : (
        <div>
          <button className='button-main' onClick={() => setAddStock(true)}>
            Add Stock
          </button>
          <button className='button-secondary' onClick={deletePortfolio}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
