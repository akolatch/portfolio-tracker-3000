import express from 'express';
import dotenv from 'dotenv';
import { portfolioRouter, tickerRouter } from './routes';
import morgan from 'morgan';
import cors from 'cors';

// configure env variables with dotenv
dotenv.config();

// create express app
export const app = express();
app.use(cors());

// add logging with morgan
app.use(morgan('dev'));

// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add routes
app.use('/portfolio', portfolioRouter);
app.use('/ticker', tickerRouter);
