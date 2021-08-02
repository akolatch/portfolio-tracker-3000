const { app } = require('../src/server/app');
const supertest = require('supertest');
const { Status } = require('../src/constants');
const { Portfolios, Tickers } = require('../src/models');
require('iconv-lite').encodingExists('foo');

const request = supertest(app);

Tickers.destroy = jest.fn();
Tickers.findByPk = jest.fn();
Tickers.update = jest.fn();

describe('PUT /ticker/:id', () => {
  beforeEach(() => {
    Tickers.findByPk.mockReset();
    Tickers.findByPk.mockResolvedValue({});
    Tickers.update.mockReset();
    Tickers.update.mockResolvedValue({});
    Tickers.destroy.mockReset();
    Tickers.destroy.mockResolvedValue({});
  });
  it('should reject invalid updates', async () => {
    const invalidUpdates = [
      {},
      { pricePaid: 0, numShares: 0, purchaseDate: '01-01' },
      { pricePaid: '', numShares: '', purchaseDate: '2021-51-01' },
    ];
    for (const update of invalidUpdates) {
      const res = await request.put(`/ticker/1`).send(update);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should return 404 if the ticker cant be found', async () => {
    Tickers.findByPk.mockResolvedValue(null);
    const res = await await request
      .put(`/ticker/1`)
      .send({ pricePaid: 2, numShares: 2, purchaseDate: '2019-01-01' });
    expect(Tickers.findByPk.mock.calls.length).toBe(1);
    expect(Tickers.update.mock.calls.length).toBe(0);
    expect(res.status).toBe(Status.NotFound);
  });

  it('should update ticker', async () => {
    const res = await await request
      .put(`/ticker/1`)
      .send({ pricePaid: 2, numShares: 2, purchaseDate: '2019-01-01' });
    expect(Tickers.update.mock.calls.length).toBe(1);
    expect(res.status).toBe(Status.NoContent);
  });
});
describe('DELETE /ticker/:id', () => {
  it('should delete a ticker', async () => {
    const res = await request.delete(`/ticker/1`);
    expect(res.status).toBe(Status.Accepted);
    expect(Tickers.destroy.mock.calls.length).toBe(1);
  });
});
