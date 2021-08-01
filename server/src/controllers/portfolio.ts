import { Request, Response } from 'express';
import { Portfolios, Tickers } from '../models';
import { Status } from '../constants';
import { tickerIsInvalid } from './helpers/tickerIsInvalid';
import { invalidString } from './helpers/invalidString';

import { getTicketData } from '../lib/getTicketData';
import { invalidSymbol } from './helpers/invalidSymbol';

export const portfolio = {
  // GET /portfolio return a list of all portfolios
  getAll: async (req: Request, res: Response) => {
    try {
      // Get all portfolios
      const portfolios = await Portfolios.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
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
      // creat a new portfolio if it doesn't already exist
      await Portfolios.findOrCreate({ where: { name } });
      res.sendStatus(Status.Created);
    } catch (err) {
      console.log('error at portfolio.create: ', err);
      res.sendStatus(Status.Error);
    }
  },

  // POST /portfolios/:id add a stock ticker to a portfolio
  addTicker: async (req: Request, res: Response) => {
    const portfolioId = req.params.id;
    try {
      // check if portfolio exists
      const exists = await Portfolios.findByPk(portfolioId);
      if (exists === null) {
        res.status(Status.NotFound).json({ message: 'Portfolio not found' });
        return;
      }

      const { symbol } = req.body;
      const updates = {
        numShares: req.body.numShares,
        pricePaid: req.body.pricePaid,
        purchaseDate: req.body.purchaseDate,
      };

      // check if the request body is valid
      if (await tickerIsInvalid({ symbol, ...updates })) {
        res.status(Status.BadRequest).json({
          message:
            'One or more attribute of your ticker data was missing or incorrect',
        });
        return;
      }

      // check if stock symbol belongs to real stock
      if (await invalidSymbol(symbol)) {
        res
          .status(Status.NotFound)
          .json({ message: 'Could not find the ticker you were looking for' });
        return;
      }

      // find or create the ticker
      const [, newTicker] = await Tickers.findOrCreate({
        where: { symbol, portfolioId },
        defaults: updates,
      });

      // if ticker already in portfolio, update it
      if (!newTicker) {
        res.status(Status.Accepted).json({ message: 'Ticker already exists' });
        return;
      }

      // respond with created ticker
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

      // if portfolio is empty, return 404
      if (portfolioTickers.length === 0) {
        res
          .status(Status.NotFound)
          .json({ message: 'Portfolio appears empty' });
        return;
      }

      // get current values of stocks in portfolio
      const portfolio = await Promise.all(
        portfolioTickers.map(async (ticker) => {
          const symbol = ticker.getDataValue('symbol');
          const { data } = await getTicketData(symbol);
          const currentPrice = Object.values(data['Global Quote'])[4];
          return {
            id: ticker.getDataValue('id'),
            symbol: symbol,
            currentPrice: currentPrice,
            numShares: ticker.getDataValue('numShares'),
            pricePaid: ticker.getDataValue('pricePaid'),
            purchaseDate: ticker.getDataValue('purchaseDate'),
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
