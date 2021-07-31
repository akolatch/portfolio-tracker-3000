import { getTicketData } from '../../lib/getTicketData';

export async function invalidSymbol(symbol: string): Promise<boolean> {
  const { data } = await getTicketData(symbol);
  if (!data || JSON.stringify(data['Global Quote']) === '{}') return true;
  return false;
}
