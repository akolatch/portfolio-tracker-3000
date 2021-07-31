import { app } from '../src/server/app';
import supertest from 'supertest';
import { Status } from '../src/constants';
import { Portfolios, Tickers } from '../src/models';
const request = supertest(app);

describe('TickerController', () => {
  it('should return reject invalid updates', async () => {
    const portfolio = await Portfolios.create({ name: 'test' });
    const portfolioId = portfolio?.getDataValue('id');
    const ticker = await Tickers.create({
      ticker: 'IBM',
      price: 1,
      shares: 1,
      portfolioId,
    });
    const tickerId = ticker?.getDataValue('id');
    const invalidUpdates = [
      {},
      { price: 0, shares: 0 },
      { price: '', shares: '' },
    ];
    for (const update of invalidUpdates) {
      const res = await request.put(`/ticker/${tickerId}`).send(update);
      expect(res.status).toBe(Status.BadRequest);
    }
  });
  it('should update ticker', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const portfolioId = portfolio?.getDataValue('id');
    const ticker = await Tickers.create({
      ticker: 'IBM',
      price: 1,
      shares: 1,
      portfolioId,
    });
    const tickerId = ticker?.getDataValue('id');

    const res = await await request
      .put(`/ticker/${tickerId}`)
      .send({ price: 2, shares: 2 });
    const tickerAfter = await Tickers.findByPk(tickerId);
    const newPrice = tickerAfter?.getDataValue('price');
    const newShares = tickerAfter?.getDataValue('shares');
    expect(newShares).toBe(2);
    expect(newPrice).toBe('2.00');
    expect(res.status).toBe(Status.NoContent);
  });

  it('should update only the fields sent', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const portfolioId = portfolio?.getDataValue('id');
    const ticker = await Tickers.create({
      ticker: 'IBM',
      price: 1,
      shares: 1,
      portfolioId,
    });
    const tickerId = ticker?.getDataValue('id');

    const res = await await request
      .put(`/ticker/${tickerId}`)
      .send({ price: 2 });
    const tickerAfter = await Tickers.findByPk(tickerId);
    const newPrice = tickerAfter?.getDataValue('price');
    const newShares = tickerAfter?.getDataValue('shares');
    expect(newShares).toBe(1);
    expect(newPrice).toBe('2.00');
    expect(res.status).toBe(Status.NoContent);
    await Tickers.destroy({ where: {} });
  });

  it('should delete a ticker', async () => {
    const portfolio = await Portfolios.findAll({ where: { name: 'test' } });
    const portfolioId = portfolio[0]?.getDataValue('id');
    const ticker = await Tickers.create({
      ticker: 'IBM',
      price: 1,
      shares: 1,
      portfolioId,
    });
    const tickerId = ticker?.getDataValue('id');
    const res = await request.delete(`/ticker/${tickerId}`);
    expect(res.status).toBe(Status.Accepted);
    const tickerAfter = await Tickers.findByPk(tickerId);
    expect(tickerAfter).toBeNull();
  });
});
