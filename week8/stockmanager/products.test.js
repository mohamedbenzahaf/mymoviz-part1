const request = require('supertest');
const app = require('./app');
const data = require('./data');

describe('Products', () => {

  // Test 1 : récupérer un produit par son ID
  test('GET /products/byId/:id', async () => {
    const response = await request(app).get('/products/byId/1202');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toEqual(
      data.find(product => product.id === 1202)
    );
  });

  // Test 2 : récupérer tous les produits d'une marque
  test('GET /products/byBrand/:brand', async () => {
    const response = await request(app).get('/products/byBrand/Amora');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('products');
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products).toEqual(
      data.filter(product => product.brand === 'Amora')
    );
  });

  // Test 3 : récupérer un produit par son numéro de lot
  test('GET /products/byBatchId/:id', async () => {
    const response = await request(app).get('/products/byBatchId/1220009508');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toEqual(
      data.find(product =>
        product.batches.some(batch => batch.id === 1220009508)
      )
    );
  });

});
