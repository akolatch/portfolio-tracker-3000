import axios from 'axios';

export async function getTicketData(symbol: string) {
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
