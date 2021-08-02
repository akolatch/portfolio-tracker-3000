
const { app } = require('../src/server/app');
const supertest = require('supertest');
const { Status } = require('../src/constants');
const { Portfolios, Tickers } = require('../src/models');
require('iconv-lite').encodingExists('foo');

let axios = require('axios');

const request = supertest(app);

Portfolios.findAll = jest.fn();
Portfolios.findOrCreate = jest.fn();
Portfolios.findByPk = jest.fn();
Portfolios.destroy = jest.fn();
Tickers.findOrCreate = jest.fn();
Tickers.findAll = jest.fn();
axios = jest.fn();

describe('GET /portfolio', () => {
  beforeEach(() => {
    Portfolios.findAll.mockReset();
    Portfolios.findAll.mockResolvedValue([]);
  });

  it('should respond with a 200 status code', async () => {
    const res = await request.get('/portfolio');
    expect(res.status).toBe(Status.OK);
  });

  it('should return an empty array when there are no portfolios', async () => {
    const res = await request.get('/portfolio');
    expect(Portfolios.findAll.mock.calls.length).toBe(1);
    expect(res.body).toEqual([]);
  });

  it('should return portfolios', async () => {
    Portfolios.findAll.mockResolvedValue([{ name: 'test', id: 1 }]);
    const res = await request.get('/portfolio');
    expect(Portfolios.findAll.mock.calls.length).toBe(1);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toEqual('test');
    expect(res.body[0].id).toBeDefined();
  });
});

describe('POST /portfolio', () => {
  beforeEach(() => {
    Portfolios.findOrCreate.mockReset();
    Portfolios.findOrCreate.mockResolvedValue({});
  });
  it('should reject a post request with an invalid body', async () => {
    const invalidBody = [{}, { name: 0 }, { name: '' }];
    for (const invalid of invalidBody) {
      const res = await request.post('/portfolio').send(invalid);
      expect(res.status).toBe(Status.BadRequest);
    }
  });

  it('should create a new portfolio', async () => {
    const res = await request.post('/portfolio').send({ name: 'test' });
    expect(Portfolios.findOrCreate.mock.calls.length).toBe(1);
    expect(res.status).toBe(Status.Created);
  });
});

describe('GET /portfolio/:id', () => {
  beforeEach(() => {
    Tickers.findAll.mockReset();
    Tickers.findAll.mockResolvedValue([]);
    axios.mockReset();
    axios.mockResolvedValue({ data: { 'Global Quote': {} } });
  });

  it('should return 404 if portfolio is empty', async () => {
    Tickers.findAll.mockResolvedValue([]);
    const res = await request.get('/portfolio/1');
    expect(Portfolios.findAll.mock.calls.length).toBe(1);
    expect(res.status).toBe(Status.NotFound);
  });
  xit('should get a portfolios tickets', async () => {
    axios.mockResolvedValue({
      data: {
        'Global Quote': {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 100,
        },
      },
    });
    Tickers.findAll.mockResolvedValue([
      {
        getDataValue: function (key) {
          return this[key];
        },
        symbol: 'IBM',
        pricePaid: 1,
        numShares: 1,
        purchaseDate: '2021-01-01',
        portfolioId: 1,
      },
      {
        getDataValue: function (key) {
          return this[key];
        },
        symbol: 'HAS',
        pricePaid: 1,
        numShares: 1,
        purchaseDate: '2021-01-01',
        portfolioId: 1,
      },
    ]);

    const res = await request.get(`/portfolio/1`);
    expect(Portfolios.findAll.mock.calls.length).toBe(1);
    expect(res.status).toBe(Status.OK);
    const tickers = res.body;
    expect(tickers).toBeDefined();
    expect(tickers.length).toBe(2);
  });
});

describe('POST /portfolio/:id', () => {
  describe('should reject a post request with an invalid body', () => {
    beforeEach(() => {
      Portfolios.findByPk.mockReset();
      Portfolios.findByPk.mockResolvedValue({});
      axios.mockReset();
      axios.mockResolvedValue({ data: { 'Global Quote': {} } });
    });

    it('should respond with a 404 status code if portfolio id is not found', async () => {
      Portfolios.findByPk.mockResolvedValue(null);
      const res = await request.post(`/portfolio/1`);
      expect(Portfolios.findByPk.mock.calls.length).toBe(1);
      expect(res.status).toBe(Status.NotFound);
    });

    it('should reject invalid symbol', async () => {
      const invalidTicker = [
        { pricePaid: 1, numShares: 1, purchaseDate: '2021-01-01' },
        { symbol: '', pricePaid: 1, numShares: 1, purchaseDate: '2021-01-01' },
        { symbol: 1, pricePaid: 1, numShares: 1, purchaseDate: '2021-01-01' },
      ];
      for (const invalid of invalidTicker) {
        const res = await request.post(`/portfolio/1`).send(invalid);
        expect(res.status).toBe(Status.BadRequest);
      }
    });

    it('should reject invalid pricePaid', async () => {
      const invalidPrice = [
        { symbol: 'IBM', numShares: 1, purchaseDate: '2021-01-01' },
        {
          symbol: 'IBM',
          pricePaid: '',
          numShares: 1,
          purchaseDate: '2021-01-01',
        },
        {
          symbol: 'IBM',
          pricePaid: 0,
          numShares: 1,
          purchaseDate: '2021-01-01',
        },
      ];
      for (const invalid of invalidPrice) {
        const res = await request.post(`/portfolio/1`).send(invalid);
        expect(res.status).toBe(Status.BadRequest);
      }
    });

    it('should reject invalid numShares', async () => {
      const invalidShares = [
        { symbol: 'IBM', pricePaid: 1, purchaseDate: '2021-01-01' },
        {
          symbol: 'IBM',
          pricePaid: 1,
          numShares: '',
          purchaseDate: '2021-01-01',
        },
        {
          symbol: 'IBM',
          pricePaid: 1,
          numShares: 0,
          purchaseDate: '2021-01-01',
        },
      ];
      for (const invalid of invalidShares) {
        const res = await request.post(`/portfolio/1`).send(invalid);
        expect(res.status).toBe(Status.BadRequest);
      }
    });

    it('should reject invalid purchaseDate', async () => {
      const invalidDate = [
        { symbol: 'IBM', pricePaid: 1, numShares: 1 },
        { symbol: 'IBM', pricePaid: 1, numShares: 1, purchaseDate: '' },
        { symbol: 'IBM', pricePaid: 1, numShares: 1, purchaseDate: 0 },
        {
          symbol: 'IBM',
          pricePaid: 1,
          numShares: 1,
          purchaseDate: '2021-50-01',
        },
      ];
      for (const invalid of invalidDate) {
        const res = await request.post(`/portfolio/1`).send(invalid);
        expect(res.status).toBe(Status.BadRequest);
      }
    });

    xit('should return 404 not found if ticker Symbol is invalid', async () => {
      const res = await request.post(`/portfolio/1`).send({
        symbol: 'bbbbbbbbb',
        pricePaid: 1,
        numShares: 1,
        purchaseDate: '2021-01-01',
      });
      expect(res.status).toBe(Status.NotFound);
    });
  });

  describe('should accept a post request with valid body', () => {
    beforeEach(() => {
      Portfolios.findByPk.mockReset();
      Portfolios.findByPk.mockResolvedValue({});
      Tickers.findOrCreate.mockReset();
      Tickers.findOrCreate.mockResolvedValue([{}, true]);
      axios.mockReset();
      axios.mockResolvedValue({ data: { 'Global Quote': {} } });
    });

    it('should save a ticker', async () => {
      Tickers.findOrCreate.mockResolvedValue([{}, true]);
      const res = await request.post(`/portfolio/1`).send({
        symbol: 'IBM',
        pricePaid: 1,
        numShares: 1,
        purchaseDate: '2021-01-01',
      });
      expect(Tickers.findOrCreate.mock.calls.length).toBe(1);
      expect(res.status).toBe(Status.Created);
    });

    it('should return accepted if ticker already exists', async () => {
      Tickers.findOrCreate.mockResolvedValue([{}, false]);
      const res = await request.post(`/portfolio/1`).send({
        symbol: 'IBM',
        pricePaid: 1,
        numShares: 1,
        purchaseDate: '2021-01-01',
      });
      expect(Tickers.findOrCreate.mock.calls.length).toBe(1);
      expect(res.status).toBe(Status.Accepted);
    });
  });
});

describe('DELETE /portfolio/:id', () => {
  beforeEach(() => {
    Portfolios.destroy.mockReset();
    Portfolios.destroy.mockResolvedValue(true);
  });

  it('should delete the portfolio', async () => {
    const res = await request.delete(`/portfolio/1`);
    expect(res.status).toBe(Status.Accepted);
    expect(Portfolios.destroy.mock.calls.length).toBe(1);
  });
});
