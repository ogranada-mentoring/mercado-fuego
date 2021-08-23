/* global it describe beforeEach */
const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const database = require('../src/model');
const { makeServer } = require('../src/server');

// Test Suite
describe('API users test', () => {
  const objetoFalso = [
    {
      id: 1,
    },
  ];

  beforeEach(() => {
    const ModeloFalso = {
      findAll() {
        return Promise.resolve(objetoFalso);
      },
    };
    sinon.stub(database, 'getModel').returns(ModeloFalso);
  });

  // Tests
  it('The api must return a list of users.', (done) => {
    const server = makeServer();
    request(server)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '10')
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        } else {
          expect(res.body.length).to.be.equal(1);
          expect(res.body[0]).to.has.key('id');
          done();
        }
      });
  });
});
