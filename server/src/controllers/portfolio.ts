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

  create: async (req: Request, res: Response) => {
    // check if portfolio name is valid
    if (
      req.body.name === undefined ||
      typeof req.body.name !== 'string' ||
      req.body.name === ''
    ) {
      res
        .status(Status.BadRequest)
        .json({ message: 'Portfolio name is required' });
      return;
    }
    try {
      await Portfolios.findOrCreate({ where: req.body });
      res.sendStatus(Status.Created);
    } catch (err) {
      console.log('error at portfolio.create: ', err);
      res.sendStatus(Status.Error);
    }
  },

  addTicker: async (req: Request, res: Response) => {},
  update: async (req: Request, res: Response) => {},

  delete: async (req: Request, res: Response) => {},
};
