import express from 'express';
import path from 'path';
import { portfolioRouter, tickerRouter } from './routes';
import { db } from '../database';
const database = db;
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../../../client/build')));
app.use('/portfolio', portfolioRouter);
app.use('/ticker', tickerRouter);
