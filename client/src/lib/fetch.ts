import { API_URL } from '../constants/api';
import { NewTicker, TickerUpdates } from '../types';
const headers = {
  'Content-Type': 'application/json',
};

export async function getPortfolioList(): Promise<Response> {
  return await fetch(`${API_URL}portfolio`);
}

export async function getPortfolio(id: number): Promise<Response> {
  return await fetch(`${API_URL}portfolio/${id}`);
}

export async function createPortfolio(data: {
  [name: string]: string;
}): Promise<Response> {
  return await fetch(`${API_URL}portfolio`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
}

export async function addStockToPortfolio(
  id: number,
  data: NewTicker
): Promise<Response> {
  return await fetch(`${API_URL}portfolio/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
}

export async function deletePortfolio(id: number): Promise<Response> {
  return await fetch(`${API_URL}portfolio/${id}`, {
    method: 'DELETE',
  });
}

export async function updateStock(
  id: number,
  data: TickerUpdates
): Promise<Response> {
  return await fetch(`${API_URL}ticker/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
}

export async function deleteTicker(id: number): Promise<Response> {
  return await fetch(`${API_URL}ticker/${id}`, {
    method: 'DELETE',
  });
}
