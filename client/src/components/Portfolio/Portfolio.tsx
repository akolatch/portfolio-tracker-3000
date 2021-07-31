import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFetchPortfolio } from '../../hooks/useFetchPortfolio';
import { TickerList } from './TickerList';

interface Props {
  name: string | undefined;
  id?: number;
}
export default function Portfolio({ name, id = 0 }: Props): React.ReactElement {
  const [portfolioData, sums, isLoading, error] = useFetchPortfolio(id);
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
      <button onClick={deletePortfolio}>Delete</button>
    </div>
  );
}
