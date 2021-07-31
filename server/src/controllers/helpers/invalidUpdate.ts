import { ITickerUpdates } from '../../types';
import { invalidDate } from './invalidDate';
import { invalidNumber } from './invalidNumber';

export function invalidUpdate(
  { numShares, pricePaid, purchaseDate }: ITickerUpdates,
  updates: ITickerUpdates
): boolean {
  let invalid = true;
  if (!invalidNumber(numShares)) {
    invalid = false;
    updates.numShares = numShares;
  }
  if (!invalidNumber(pricePaid)) {
    invalid = false;
    updates.pricePaid = pricePaid;
  }
  if (!invalidDate(purchaseDate)) {
    invalid = false;
    updates.purchaseDate = purchaseDate;
  }
  return invalid;
}
