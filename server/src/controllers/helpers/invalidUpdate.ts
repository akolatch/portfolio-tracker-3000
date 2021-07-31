import { ITickerUpdates } from '../../types';
import { invalidNumber } from './invalidNumber';

export function invalidUpdate(
  { shares, price }: ITickerUpdates,
  updates: ITickerUpdates
): boolean {
  let invalid = true;
  if (!invalidNumber(shares)) {
    invalid = false;
    updates.shares = shares;
  }
  if (!invalidNumber(price)) {
    invalid = false;
    updates.price = price;
  }
  return invalid;
}
