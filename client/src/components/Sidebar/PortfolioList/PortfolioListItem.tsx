import React from 'react';
import { Link } from 'react-router-dom';
import { PortfolioDetails } from '../../../types';

interface Props {
  portfolio: PortfolioDetails;
  setSelectedPortfolio: React.Dispatch<
    React.SetStateAction<PortfolioDetails | null>
  >;
}

export function PortfolioListItem({
  portfolio,
  setSelectedPortfolio,
}: Props): React.ReactElement {
  return (
    <li className='button-main'>
      <Link
        to={`/portfolio/${portfolio.id}`}
        onClick={() => setSelectedPortfolio(portfolio)}
      >
        {portfolio.name}
      </Link>
    </li>
  );
}
