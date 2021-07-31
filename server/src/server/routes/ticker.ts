import { Router } from 'express';
import { ticker } from '../../controllers';

export const tickerRouter = Router();

tickerRouter.route('/:id').put(ticker.update).delete(ticker.delete);
