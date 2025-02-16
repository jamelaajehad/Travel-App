global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
const request = require('supertest');
const app = require('../server/server'); // path to server.js

describe('Express Server', () => {
  it('should respond with status 200 for the root route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  }, 10000); 

  it('should respond with a 404 for an unknown route', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.statusCode).toBe(404);
  }, 10000); 
});