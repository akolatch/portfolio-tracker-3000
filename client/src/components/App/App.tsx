import React, { useEffect, useState } from 'react';
import { Portfolio } from '../../types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

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

        <main>
          <Switch></Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
