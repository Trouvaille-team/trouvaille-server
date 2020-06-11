'use strict';

const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { TEST_DATABASE_URL } = require('../src/config');
const { MockUser, insertMockUser } = require('./test-helpers');

describe.only('trips endpoint', function () {
  //this.timeout(500000);
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL,
    });
    app.set('db', db);
    const user = new MockUser();
    insertMockUser(user);
  });

  after('disconnect from db', () => db.destroy());

  it('should respond 200 with users trips', () => {
    return supertest(app)
      .get('/api/trips/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.exist;
      });
  });

  it('should respond 400 if no trips exist', () => {
    return supertest(app)
      .get('/api/trips/:user_id')
      .expect(400, { message: 'cannot find any existing trips' });
  });
});
