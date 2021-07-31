import React, { useEffect, useState } from 'react';
import { Portfolio } from '../../types';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import { AddPortfolio } from '../AddPortfolio/AddPortfolio';
import { PortfolioList } from '../PorfolioList/PortfolioList';

function App(): React.ReactElement {
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);

  useEffect(() => {
    fetch('/portfolio')
      .then((response) => response.json())
      .then((data) => setPortfolioList(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <div>
        <h1>Portfolio Tracker 3000</h1>
        <PortfolioList portfolioList={portfolioList} />
        <Link to='/portfolio/new'>Add Portfolio</Link>
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