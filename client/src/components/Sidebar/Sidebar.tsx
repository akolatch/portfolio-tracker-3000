import React from 'react';
import { Link } from 'react-router-dom';
import { PortfolioDetails } from '../../types';
import { PortfolioList } from './PortfolioList/PortfolioList';
import './Sidebar.scss';
interface Props {
  portfolioList: PortfolioDetails[];
  setSelectedPortfolio: React.Dispatch<
    React.SetStateAction<PortfolioDetails | null>
  >;
}
export function Sidebar({
  portfolioList,
  setSelectedPortfolio,
}: Props): React.ReactElement {
  return (
    <section className='sidebar'>
      <Link className='button-main' to='/portfolio/new'>
        Add Portfolio
      </Link>
      <PortfolioList
        portfolioList={portfolioList}
        setSelectedPortfolio={setSelectedPortfolio}
      />
    </section>
  );
}
