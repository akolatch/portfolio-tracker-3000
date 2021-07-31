import React, { useEffect, useState } from 'react';
import { Portfolio } from '../../types';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import { AddPortfolio } from '../AddPortfolio/AddPortfolio';
import { PortfolioList } from '../PorfolioList/PortfolioList';

function App(): React.ReactElement {
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(
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
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
