import axios, { AxiosResponse } from 'axios';

export async function getTicketData(symbol: string): Promise<AxiosResponse> {
  const params = {
    function: 'GLOBAL_QUOTE',
    apikey: process.env.API_KEY,
    symbol,
  };

  return await axios.get(`https://www.alphavantage.co/query`, {
    headers: { 'User-Agent': 'request' },
    params,
  });
}
