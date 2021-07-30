import { Router } from 'express';
import { portfolios } from '../../controllers';

export const portfolioRouter = Router();

portfolioRouter.route('/').get(portfolios.getAll).post();

portfolioRouter.route('/:id').get().post().put().delete();
