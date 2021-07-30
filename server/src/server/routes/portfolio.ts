import { Router } from 'express';

export const portfolioRouter = Router();

portfolioRouter.route('/').get().post();

portfolioRouter.route('/:id').get().post().put().delete();
