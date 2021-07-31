import React from 'react';
import { useFetchPortfolio } from '../../hooks/useFetchPortfolio';

interface Props {
  name: string;
  id: number;
}
export default function Portfolio({ name, id }: Props): React.ReactElement {
  const [portfolioData, sums, isLoading] = useFetchPortfolio(id);
  return (
    <div>
      <h3>{name}</h3>
      <div>
        <div>{`Total Paid: $${sums.paid}`}</div>
        <div>{`Current Value: $${sums.value}`}</div>
        <div>{`Total Profit: $${sums.profit}`}</div>
      </div>
    </div>
  );
}
