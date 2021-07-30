import { Router } from 'express';

export const tickerRouter = Router();

tickerRouter.route('/:id').put().delete();
