import React from 'react';
import { Link } from 'react-router-dom';
import { TPortfolio } from '../../types';

interface Props {
  portfolio: TPortfolio;
  setSelectedPortfolio: React.Dispatch<React.SetStateAction<TPortfolio | null>>;
}

export function PortfolioListItem({
  portfolio,
  setSelectedPortfolio,
}: Props): React.ReactElement {
  return (
    <li>
      <Link
        to={`/portfolio/${portfolio.id}`}
        onClick={() => setSelectedPortfolio(portfolio)}
      >
        {portfolio.name}
      </Link>
    </li>
  );
}
