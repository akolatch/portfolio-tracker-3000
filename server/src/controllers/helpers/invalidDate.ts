import { invalidString } from './invalidString';

export function invalidDate(date: any): boolean {
  if (invalidString(date)) return true;
  const dateTest = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(dateTest)) return true;
  const dateObj = new Date(date);
  return isNaN(dateObj.getTime());
}
