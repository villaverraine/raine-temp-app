import request from "supertest"; // For testing express routes
import chai from "chai";
import app from "../index.js"; // Adjust if app.js is in a different directory

const { expect } = chai;

describe('GET /api/endpoint', function () {
  it('should return a 200 status code', function (done) {
    request(app)
      .get('/api/status')
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return correct response body', function (done) {
    request(app)
      .get('/api/endpoint')
      .end(function (err, res) {
        if (err) done(err);
        expect(res.body).to.have.property('key', 'value');
        done();
      });
  });
});