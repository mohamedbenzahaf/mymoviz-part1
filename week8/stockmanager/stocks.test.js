const request = require('supertest');
const app = require('./app');

describe('Stocks', () => {
  test('GET /stocks/byProductId/:id', async () => {
    const response = await request(app).get('/stocks/byProductId/1311');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ stocks: 54500 });
  });

  test('GET /stocks/byTimestamp', async () => {
    const response = await request(app).get(
      '/stocks/byTimestamp?productId=1490&start=2319667200000&end=2327270400000'
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ stocks: 5000 });
  });
});