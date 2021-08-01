import React, { useState } from 'react';
import { PortfolioDetails } from '../../types';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import { AddPortfolio } from '../AddPortfolio/AddPortfolio';
import { PortfolioList } from '../PortfolioList/PortfolioList';
import Portfolio from '../Portfolio/Portfolio';
import Home from './Home';

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
        <section className='sidebar'>
          <Link className='button-main' to='/portfolio/new'>
            Add Portfolio
          </Link>
          <PortfolioList
            portfolioList={portfolioList}
            setSelectedPortfolio={setSelectedPortfolio}
          />
        </section>
        <main className='main-view'>
          <Switch>
            <Route path='/' exact>
              <Home setPortfolioList={setPortfolioList} />
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
