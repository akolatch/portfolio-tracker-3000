import { app } from '../src/server/app';
import supertest from 'supertest';
import { Status } from '../src/constants';
import { Portfolios, Tickers } from '../src/models';
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

  it('should return portfolios', async () => {
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

  it('should reject invalid symbol', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const invalidTicker = [
      { pricePaid: 1, numShares: 1, purchaseDate: '2021-01-01' },
      { symbol: '', pricePaid: 1, numShares: 1, purchaseDate: '2021-01-01' },
      { symbol: 1, pricePaid: 1, numShares: 1, purchaseDate: '2021-01-01' },
    ];
    for (const invalid of invalidTicker) {
      const res = await request.post(`/portfolio/${id}`).send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should reject invalid pricePaid', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const invalidPrice = [
      { symbol: 'IBM', numShares: 1, purchaseDate: '2021-01-01' },
      {
        symbol: 'IBM',
        pricePaid: '',
        numShares: 1,
        purchaseDate: '2021-01-01',
      },
      { symbol: 'IBM', pricePaid: 0, numShares: 1, purchaseDate: '2021-01-01' },
    ];
    for (const invalid of invalidPrice) {
      const res = await request.post(`/portfolio/${id}`).send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should reject invalid numShares', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const invalidShares = [
      { symbol: 'IBM', pricePaid: 1, purchaseDate: '2021-01-01' },
      {
        symbol: 'IBM',
        pricePaid: 1,
        numShares: '',
        purchaseDate: '2021-01-01',
      },
      { symbol: 'IBM', pricePaid: 1, numShares: 0, purchaseDate: '2021-01-01' },
    ];
    for (const invalid of invalidShares) {
      const res = await request.post(`/portfolio/${id}`).send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should reject invalid purchaseDate', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const invalidDate = [
      { symbol: 'IBM', pricePaid: 1, numShares: 1 },
      { symbol: 'IBM', pricePaid: 1, numShares: 1, purchaseDate: '' },
      { symbol: 'IBM', pricePaid: 1, numShares: 1, purchaseDate: 0 },
      { symbol: 'IBM', pricePaid: 1, numShares: 1, purchaseDate: '2021-50-01' },
    ];
    for (const invalid of invalidDate) {
      const res = await request.post(`/portfolio/${id}`).send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  xit('should return 404 not found if ticker Symbol is invalid', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const res = await request.post(`/portfolio/${id}`).send({
      symbol: 'bbbbbbbbb',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
    });
    expect(res.status).toBe(Status.NotFound);
  });

  it('should save a ticker', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    await Tickers.destroy({ where: { portfolioId: id } });
    const res = await request.post(`/portfolio/${id}`).send({
      symbol: 'IBM',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
    });
    expect(res.status).toBe(Status.Created);
    const ticker = await Tickers.findOne({ where: { symbol: 'IBM' } });
    expect(ticker).toBeDefined();
  });

  it('should return accepted if ticker already exists', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const res = await request.post(`/portfolio/${id}`).send({
      symbol: 'IBM',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
    });
    expect(res.status).toBe(Status.Accepted);
  });

  it('should delete the portfolio', async () => {
    const portfolio = await Portfolios.findOne({ where: { name: 'test' } });
    const id = portfolio?.getDataValue('id');
    const res = await request.delete(`/portfolio/${id}`);
    expect(res.status).toBe(Status.Accepted);
    const portfolioCount = await Portfolios.count({ where: { name: 'test' } });
    expect(portfolioCount).toEqual(0);
  });

  it('should delete all tickers in the portfolio', async () => {
    const portfolio = await Portfolios.create({ name: 'test' });
    const id = portfolio?.getDataValue('id');
    await Tickers.create({
      symbol: 'IBM',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId: id,
    });
    await Tickers.create({
      symbol: 'AAPL',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId: id,
    });
    await Tickers.create({
      symbol: 'MSFT',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId: id,
    });
    const tickersCount = await Tickers.count({ where: { portfolioId: id } });
    expect(tickersCount).toBe(3);
    const res = await request.delete(`/portfolio/${id}`);
    expect(res.status).toBe(Status.Accepted);
    const tickersCountAfter = await Tickers.count({
      where: { portfolioId: id },
    });
    expect(tickersCountAfter).toEqual(0);
  });
  xit('should get a portfolios tickets', async () => {
    const portfolio = await Portfolios.create({ name: 'test' });
    const id = portfolio?.getDataValue('id');
    await Tickers.create({
      symbol: 'IBM',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId: id,
    });
    await Tickers.create({
      symbol: 'HAS',
      pricePaid: 1,
      numShares: 1,
      purchaseDate: '2021-01-01',
      portfolioId: id,
    });

    const res = await request.get(`/portfolio/${id}`);
    expect(res.status).toBe(Status.OK);
    const tickers = res.body;
    expect(tickers).toBeDefined();
    expect(tickers.length).toBe(2);
  });
});
