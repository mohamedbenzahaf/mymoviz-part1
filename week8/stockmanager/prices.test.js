const request = require('supertest');
const app = require('./app');
const data = require('./data');

describe('Prices', () => {

  test('GET /prices/average/:brand', async () => {
    const response = await request(app).get('/prices/average/Amora');

    const products = data.filter(product => product.brand === 'Amora');
    const expectedAverage =
      products.reduce((sum, product) => sum + product.price, 0) /
      products.length;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('average');
    expect(response.body.average).toBeCloseTo(expectedAverage);
  });

  test('GET /prices/averageUnit/:brand', async () => {
    const response = await request(app).get('/prices/averageUnit/Amora');

    const products = data.filter(product => product.brand === 'Amora');
    const expectedAverage =
      products.reduce((sum, product) => sum + product.unitPrice, 0) /
      products.length;

    expect(response.status).toBe(200);
   expect(response.body).toHaveProperty('average');
expect(response.body.average).toBeCloseTo(expectedAverage);
  });

});