const request = require('supertest');
const app = require('./app');
const data = require('./data');

describe('Recalls', () => {

  // Test 1 : récupérer les IDs des produits rappelés d'une marque
  test('GET /recalls/byBrand/:brand', async () => {
    const response = await request(app).get('/recalls/byBrand/Amora');

    const expectedProducts = data
      .filter(product =>
        product.brand === 'Amora' &&
        product.batches.some(batch => batch.recall === true)
      )
      .map(product => product.id);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('products');
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products).toEqual(expectedProducts);
  });

  // Test 2 : récupérer les IDs des produits rappelés à une date donnée
  test('GET /recalls/byTimestamp/:timestamp', async () => {
    const timestamp = Date.parse('2043-04-12T00:00:00.000Z');

    const response = await request(app).get(
      `/recalls/byTimestamp/${timestamp}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('products');
    expect(response.body.products).toContain(1202);
  });

});

