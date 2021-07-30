import { Router } from 'express';

export const tickerRouter = Router();

tickerRouter.route('/:id').post().put().delete();
