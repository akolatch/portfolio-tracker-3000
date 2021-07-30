import { app } from '../src/server/app';
import supertest from 'supertest';
import { Status } from '../src/constants';
import { Portfolios } from '../src/models';
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
    await Portfolios.destroy({ where: {} });
    const numPortfolios = await Portfolios.count({});
    await request.post('/portfolio').send({ name: 'test' });
    const portfolios = await Portfolios.findAll();
    expect(portfolios.length).toEqual(numPortfolios + 1);
  });
});
