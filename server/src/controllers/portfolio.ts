import { Request, Response } from 'express';
import { Portfolios, Tickers } from '../models';
import { Status } from '../constants';
import { tickerIsInvalid } from './helpers/tickerIsInvalid';
import { invalidString } from './helpers/invalidString';
export const portfolios = {
  getAll: async (req: Request, res: Response) => {
    try {
      const portfolios = await Portfolios.findAll();
      res.status(Status.OK).json(portfolios);
    } catch (err) {
      console.log('error at portfolio.getAll: ', err);
      res.sendStatus(Status.Error);
    }
  },

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

  addTicker: async (req: Request, res: Response) => {
    // check if ticker is valid

    if (await tickerIsInvalid(res, req.body)) return;
    try {
      await Tickers.findOrCreate({ where: req.body });
      res.sendStatus(Status.Created);
    } catch (err) {
      console.log('error at portfolio.addTicker: ', err);
      res.sendStatus(Status.Error);
    }
  },
  update: async (req: Request, res: Response) => {},

  delete: async (req: Request, res: Response) => {},
};
