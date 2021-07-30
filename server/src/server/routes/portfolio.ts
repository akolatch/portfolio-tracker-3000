import { Router } from 'express';
import { portfolios } from '../../controllers';

export const portfolioRouter = Router();

portfolioRouter.route('/').get(portfolios.getAll).post(portfolios.create);

portfolioRouter.route('/:id').get().post(portfolios.addTicker).put().delete();
