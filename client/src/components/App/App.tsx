import React, { useEffect, useState } from 'react';
import { TPortfolio } from '../../types';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import { AddPortfolio } from '../AddPortfolio/AddPortfolio';
import { PortfolioList } from '../PorfolioList/PortfolioList';
import Portfolio from '../Portfolio/Portfolio';

function App(): React.ReactElement {
  const [portfolioList, setPortfolioList] = useState<TPortfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<TPortfolio | null>(
    null
  );
  useEffect(() => {
    const fetchPortfolioList = async () => {
      const response = await fetch('/portfolio');
      const data = await response.json();
      setPortfolioList(data);
    };
    fetchPortfolioList();
  }, []);

  return (
    <Router>
      <div>
        <h1>Portfolio Tracker 3000</h1>
        <Link to='/portfolio/new'>Add Portfolio</Link>
        <PortfolioList
          portfolioList={portfolioList}
          setSelectedPortfolio={setSelectedPortfolio}
        />
        <main>
          <Switch>
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
