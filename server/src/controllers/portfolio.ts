import { Request, Response } from 'express';
import { Portfolios, Tickers } from '../models';
import { Status } from '../constants';
import { tickerIsInvalid } from './helpers/tickerIsInvalid';
import { invalidString } from './helpers/invalidString';

import { getTicketData } from '../lib/getTicketData';

export const portfolio = {
  // GET /portfolios return a list of all portfolios
  getAll: async (req: Request, res: Response) => {
    try {
      const portfolios = await Portfolios.findAll();
      res.status(Status.OK).json(portfolios);
    } catch (err) {
      console.log('error at portfolio.getAll: ', err);
      res.sendStatus(Status.Error);
    }
  },

  // POST /portfolios create a new portfolio
  create: async (req: Request, res: Response) => {
    // check if portfolio name is valid
    const name = req.body.name;
    if (invalidString(name)) {
      res
        .status(Status.BadRequest)
        .json({ message: 'Portfolio name is required' });
      return;
    }
    try {
      await Portfolios.findOrCreate({ where: { name } });
      res.sendStatus(Status.Created);
    } catch (err) {
      console.log('error at portfolio.create: ', err);
      res.sendStatus(Status.Error);
    }
  },

  // POST /portfolios/:id add a ticker to a portfolio
  addTicker: async (req: Request, res: Response) => {
    const portfolioId = req.params.id;
    try {
      const exists = await Portfolios.findByPk(portfolioId);
      if (exists === null) {
        res.status(Status.NotFound).json({ message: 'Portfolio not found' });
        return;
      }
      // check if ticker is valid
      if (await tickerIsInvalid(res, req.body)) return;

      const { ticker, shares, price } = req.body;

      const [, newTicker] = await Tickers.findOrCreate({
        where: { ticker, portfolioId },
        defaults: { shares, price },
      });
      // console.log(newTicker[1]);
      if (!newTicker) {
        res.status(Status.Accepted).json({ message: 'Ticker already exists' });
        return;
      }
      res.sendStatus(Status.Created);
    } catch (err) {
      console.log('error at portfolio.addTicker: ', err);
      res.sendStatus(Status.Error);
    }
  },

  // GET /portfolios/:id return a portfolio with all its tickers
  getById: async (req: Request, res: Response) => {
    const portfolioId = req.params.id;
    try {
      // get all tickers where id = portfolioId
      const portfolioTickers = await Tickers.findAll({
        where: { portfolioId },
      });
      if (portfolioTickers.length === 0) {
        res
          .status(Status.NotFound)
          .json({ message: 'Portfolio appears empty' });
        return;
      }
      const portfolio = await Promise.all(
        portfolioTickers.map(async (ticker) => {
          const symbol = ticker.getDataValue('ticker');
          const { data } = await getTicketData(symbol);
          // console.log(Object.keys(data['Global Quote'])[4]);
          const currentPrice = Object.values(data['Global Quote'])[4];
          return {
            ticker: symbol,
            currentPrice: currentPrice,
            shares: ticker.getDataValue('shares'),
            price: ticker.getDataValue('price'),
            createdAt: ticker.getDataValue('createdAt'),
          };
        })
      );

      res.status(Status.OK).json(portfolio);
    } catch (err) {
      console.log('error at portfolio.getPortfolioById: ', err);
      res.sendStatus(Status.Error);
    }
  },

  // DELETE /portfolios/:id delete a portfolio
  delete: async (req: Request, res: Response) => {
    const portfolioId = req.params.id;
    try {
      const exists = await Portfolios.findByPk(portfolioId);
      if (exists === null) {
        res.status(Status.NotFound).json({ message: 'Portfolio not found' });
        return;
      }
      await Portfolios.destroy({
        where: { id: portfolioId },
        cascade: true,
      });
      res.sendStatus(Status.Accepted);
    } catch (err) {
      console.log('error at portfolio.delete: ', err);
      res.sendStatus(Status.Error);
    }
  },
};
