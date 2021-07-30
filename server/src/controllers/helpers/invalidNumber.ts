export function invalidNumber(value: any): boolean {
  return typeof value !== 'number' || value <= 0;
}
