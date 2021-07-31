import React from 'react';
import { Link } from 'react-router-dom';
import { Portfolio } from '../../types';

interface Props {
  portfolio: Portfolio;
}

export function PortfolioListItem({ portfolio }: Props): React.ReactElement {
  return (
    <li>
      <Link to={`/portfolio/${portfolio.id}`}>{portfolio.name}</Link>
    </li>
  );
}
