import { ITicker } from '../../types';
import { invalidString } from './invalidString';
import { invalidNumber } from './invalidNumber';
import { invalidDate } from './invalidDate';

export async function tickerIsInvalid({
  symbol,
  numShares,
  pricePaid,
  purchaseDate,
}: ITicker) {
  return (
    invalidNumber(numShares) ||
    invalidNumber(pricePaid) ||
    invalidDate(purchaseDate) ||
    invalidString(symbol)
  );
}
