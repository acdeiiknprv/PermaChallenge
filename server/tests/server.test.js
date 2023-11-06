const request = require('supertest');
const { app } = require('../index');

let server;

beforeAll((done) => {
  server = app.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Express Server Tests', () => {
  
  describe('GET /products', () => {
    it('should return a list of products', async () => {
      const res = await request(app).get('/products');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('products');
    });
  });

  describe('GET /products/:id', () => {
    it('should return a single product', async () => {
      const res = await request(app).get('/products/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('POST /login', () => {
    it('should return an authentication token', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'kminchelle', password: '0lelplR' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });

  describe('POST /products', () => {
    it('should require authentication', async () => {
      const res = await request(app).post('/products');
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('PUT /products/:id', () => {
    it('should require authentication', async () => {
      const res = await request(app).put('/products/1');
      expect(res.statusCode).toEqual(401);
    });
  });

});
