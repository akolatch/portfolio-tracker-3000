import React from 'react';
import { Link } from 'react-router-dom';
import { Portfolio } from '../../types';

interface Props {
  portfolio: Portfolio;
  setSelectedPortfolio: React.Dispatch<React.SetStateAction<Portfolio | null>>;
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
