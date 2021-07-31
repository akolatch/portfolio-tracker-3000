import { Request, Response } from 'express';
import { Tickers } from '../models';
import { Status } from '../constants';
import { ITickerUpdates } from '../types';
import { invalidUpdate } from './helpers/invalidUpdate';

export const ticker = {
  update: async (req: Request, res: Response) => {
    const { price, shares, purchaseDate } = req.body;

    const updates: ITickerUpdates = {};
    if (invalidUpdate({ price, shares }, updates)) {
      res
        .status(Status.BadRequest)
        .json({ message: 'Must include at least on update' });
      return;
    }
    const id = req.params.id;
    try {
      const exists = await Tickers.findByPk(id);
      if (exists === null) {
        res.status(Status.NotFound).json({ message: 'Portfolio not found' });
        return;
      }

      await Tickers.update(updates, { where: { id } });
      res.sendStatus(Status.NoContent);
    } catch (err) {
      console.log('error at ticker.update: ', err);
      res.sendStatus(Status.Error);
    }
  },
  delete: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const exists = await Tickers.findByPk(id);
      if (exists === null) {
        res.status(Status.NotFound).json({ message: 'Portfolio not found' });
        return;
      }

      await Tickers.destroy({ where: { id } });
      res.sendStatus(Status.Accepted);
    } catch (err) {
      console.log('error at ticker.delete: ', err);
      res.sendStatus(Status.Error);
    }
  },
};
