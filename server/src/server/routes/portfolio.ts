import { Router } from 'express';
import { portfolio as portfolio } from '../../controllers';

export const portfolioRouter = Router();

portfolioRouter.route('/').get(portfolio.getAll).post(portfolio.create);

portfolioRouter.route('/:id').get().post(portfolio.addTicker).delete();
