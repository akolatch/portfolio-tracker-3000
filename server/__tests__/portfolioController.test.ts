import { app } from '../src/server/app';
import supertest from 'supertest';
import { Status } from '../src/constants';
import { Portfolios, Tickers } from '../src/models';
import { where } from 'sequelize/types';
const request = supertest(app);

describe('Portfolio Controllers', () => {
  it('should return 200 for /', async () => {
    const res = await request.get('/portfolio');
    expect(res.status).toBe(Status.OK);
  });
  it('should return an empty array when there are no portfolios', async () => {
    await Portfolios.destroy({ where: {} });
    const res = await request.get('/portfolio');
    expect(res.body).toEqual([]);
  });
  it('should return an empty array when there are no portfolios', async () => {
    await Portfolios.destroy({ where: {} });
    await Portfolios.create({ name: 'test' });
    const res = await request.get('/portfolio');
    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toEqual('test');
    expect(res.body[0].id).toBeDefined();
  });

  it('should reject a post request with an invalid body', async () => {
    const invalidBody = [{}, { name: 0 }, { name: '' }];
    for (const invalid of invalidBody) {
      const res = await request.post('/portfolio').send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should create a new portfolio', async () => {
    await Portfolios.destroy({ where: { name: 'test' } });
    const numPortfolios = await Portfolios.count({});
    await request.post('/portfolio').send({ name: 'test' });
    const portfolios = await Portfolios.findAll();
    expect(portfolios.length).toEqual(numPortfolios + 1);
  });

  it('should return 404 if the portfolio id is not found', async () => {
    const id = 1;
    const res = await request.post(`/portfolio/${id}`);
    expect(res.status).toBe(Status.NotFound);
  });

  it('should reject invalid ticker', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const invalidTicker = [
      { price: 1, shares: 1 },
      { ticker: '', price: 1, shares: 1 },
      { ticker: 1, price: 1, shares: 1 },
    ];
    for (const invalid of invalidTicker) {
      const res = await request.post(`/portfolio/${id}`).send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should reject invalid price', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const invalidPrice = [
      { ticker: 'IBM', shares: 1 },
      { ticker: 'IBM', price: '', shares: 1 },
      { ticker: 'IBM', price: 0, shares: 1 },
    ];
    for (const invalid of invalidPrice) {
      const res = await request.post(`/portfolio/${id}`).send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should reject invalid shares', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const invalidShares = [
      { ticker: 'IBM', price: 1 },
      { ticker: 'IBM', price: 1, shares: '' },
      { ticker: 'IBM', price: 1, shares: 0 },
    ];
    for (const invalid of invalidShares) {
      const res = await request.post(`/portfolio/${id}`).send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should return 404 not found if ticker Symbol is invalid', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const res = await request
      .post(`/portfolio/${id}`)
      .send({ ticker: 'bbbbbbbbb', price: 1, shares: 1 });
    expect(res.status).toBe(Status.NotFound);
  });

  it('should save a ticker', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    await Tickers.destroy({ where: { portfolioId: id } });
    const res = await request
      .post(`/portfolio/${id}`)
      .send({ ticker: 'IBM', price: 1, shares: 1 });
    expect(res.status).toBe(Status.Created);
    const ticker = await Tickers.findOne({ where: { ticker: 'IBM' } });
    expect(ticker).toBeDefined();
  });

  it('should return accepted if ticker already exists', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const res = await request
      .post(`/portfolio/${id}`)
      .send({ ticker: 'IBM', price: 1, shares: 1 });
    expect(res.status).toBe(Status.Accepted);
  });
});
