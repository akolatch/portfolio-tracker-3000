import { Request, Response } from 'express';
import { Tickers } from '../models';
import { Status } from '../constants';
import { ITickerUpdates } from '../types';
import { invalidUpdate } from './helpers/invalidUpdate';

export const ticker = {
  // PUT /ticker/:id updates a ticker
  update: async (req: Request, res: Response) => {
    const { pricePaid, numShares, purchaseDate } = req.body;

    // Validate the req body and add valid updates to the updates object
    // If the update is invalid, return a 400 status
    const updates: ITickerUpdates = {};
    if (invalidUpdate({ pricePaid, numShares, purchaseDate }, updates)) {
      res
        .status(Status.BadRequest)
        .json({ message: 'Must include at least on update' });
      return;
    }

    const id = req.params.id;
    try {
      // check that the ticker exists
      const exists = await Tickers.findByPk(id);

      // if the ticker doesn't exist, return a 404
      if (exists === null) {
        res.status(Status.NotFound).json({ message: 'Ticker not found' });
        return;
      }

      // update the ticker
      console.log(updates);
      await Tickers.update(updates, { where: { id } });
      res.sendStatus(Status.NoContent);
    } catch (err) {
      console.log('error at ticker.update: ', err);
      res.sendStatus(Status.Error);
    }
  },

  // DELETE /ticker/:id deletes a ticker
  delete: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await Tickers.destroy({ where: { id } });
      res.sendStatus(Status.Accepted);
    } catch (err) {
      console.log('error at ticker.delete: ', err);
      res.sendStatus(Status.Error);
    }
  },
};
