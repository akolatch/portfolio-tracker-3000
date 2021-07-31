import { app } from '../src/server/app';
import supertest from 'supertest';
import { Status } from '../src/constants';
import { Portfolios, Tickers } from '../src/models';
import { where } from 'sequelize/types';
const request = supertest(app);

describe('TickerController', () => {
  it('should reject invalid updates', async () => {
    const portfolio = await Portfolios.findOrCreate({
      where: { name: 'test' },
    });
    const portfolioId = portfolio[0].getDataValue('id');
    await Tickers.destroy({ where: { portfolioId } });
    const ticker = await Tickers.create({
      symbol: 'IBM',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId,
    });
    const tickerId = ticker?.getDataValue('id');
    const invalidUpdates = [
      {},
      { pricePaid: 0, numShares: 0, purchaseDate: '01-01' },
      { pricePaid: '', numShares: '', purchaseDate: '2021-51-01' },
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
      symbol: 'IBM',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId,
    });
    const tickerId = ticker?.getDataValue('id');

    const res = await await request
      .put(`/ticker/${tickerId}`)
      .send({ pricePaid: 2, numShares: 2, purchaseDate: '2019-01-01' });
    const tickerAfter = await Tickers.findByPk(tickerId);
    const newPrice = tickerAfter?.getDataValue('pricePaid');
    const newShares = tickerAfter?.getDataValue('numShares');
    const newPurchaseDate = tickerAfter?.getDataValue('purchaseDate');
    expect(newShares).toBe(2);
    expect(newPrice).toBe('2.00');
    expect(newPurchaseDate).toBe('2019-01-01');
    expect(res.status).toBe(Status.NoContent);
  });

  it('should update only the fields sent', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const portfolioId = portfolio?.getDataValue('id');
    const ticker = await Tickers.create({
      symbol: 'IBM',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId,
    });
    const tickerId = ticker?.getDataValue('id');

    const res = await await request
      .put(`/ticker/${tickerId}`)
      .send({ pricePaid: 2 });
    const tickerAfter = await Tickers.findByPk(tickerId);
    const newPrice = tickerAfter?.getDataValue('pricePaid');
    const newShares = tickerAfter?.getDataValue('numShares');
    expect(newShares).toBe(1);
    expect(newPrice).toBe('2.00');
    expect(res.status).toBe(Status.NoContent);
    await Tickers.destroy({ where: {} });
  });

  it('should delete a ticker', async () => {
    const portfolio = await Portfolios.findAll({ where: { name: 'test' } });
    const portfolioId = portfolio[0]?.getDataValue('id');
    const ticker = await Tickers.create({
      symbol: 'IBM',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId,
    });
    const tickerId = ticker?.getDataValue('id');
    const res = await request.delete(`/ticker/${tickerId}`);
    expect(res.status).toBe(Status.Accepted);
    const tickerAfter = await Tickers.findByPk(tickerId);
    expect(tickerAfter).toBeNull();
  });
});
