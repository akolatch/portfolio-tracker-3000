import { getTicketData } from '../../lib/getTicketData';
import { Response } from 'express';
import { ITicker } from '../../types';
import { Status } from '../../constants';
import { invalidString } from './invalidString';

export async function tickerIsInvalid(
  res: Response,
  { ticker, shares, price }: ITicker
) {
  if (typeof shares !== 'number' || typeof price !== 'number') {
    res.status(Status.BadRequest).json({
      message: 'One or more attribute of your ticker data was missing',
    });
    return true;
  }
  if (invalidString(ticker)) {
    res.status(Status.BadRequest).json({
      message: 'Must include a ticker symbol',
    });
    return true;
  }

  const { data } = await getTicketData(ticker);
  if (data['Global Quote'] === {}) {
    res
      .status(Status.NotFound)
      .json({ message: 'Could not find the ticker you were looking for' });
    return true;
  }
  return false;
}
