import React, { useState } from 'react';
import { PortfolioDetails } from '../../types';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { AddPortfolio } from '../AddPortfolio/AddPortfolio';
import Portfolio from '../Portfolio/Portfolio';
import { Loading } from './Loading';
import { Sidebar } from '../Sidebar/Sidebar';
import './App.scss';

function App(): React.ReactElement {
  const [portfolioList, setPortfolioList] = useState<PortfolioDetails[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioDetails | null>(null);

  return (
    <Router>
      <div className='grid-container'>
        <header className='header'>
          <Link to='/'>
            <h1>Portfolio Tracker 3000</h1>
          </Link>
        </header>
        <Sidebar
          portfolioList={portfolioList}
          setSelectedPortfolio={setSelectedPortfolio}
        />
        <main className='main-view'>
          <Switch>
            <Route path='/' exact>
              <Loading setPortfolioList={setPortfolioList} />
            </Route>
            <Route path='/portfolio/new' exact>
              <AddPortfolio />
            </Route>
            <Route path='/portfolio/:id' exact>
              <Portfolio
                name={selectedPortfolio?.name}
                id={selectedPortfolio?.id}
              />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
