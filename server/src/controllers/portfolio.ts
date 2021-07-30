import { Request, Response } from 'express';
import { Portfolios, Tickers } from '../models';
import { Status } from '../constants';
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

  create: async (req: Request, res: Response) => {},

  update: async (req: Request, res: Response) => {},

  delete: async (req: Request, res: Response) => {},
};
