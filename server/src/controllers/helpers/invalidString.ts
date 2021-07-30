export function invalidString(value: any): boolean {
  return typeof value !== 'string' || value === '';
}
