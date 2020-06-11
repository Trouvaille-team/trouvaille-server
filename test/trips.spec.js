'use strict';

const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { TEST_DATABASE_URL } = require('../src/config');

describe('trips endpoint', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  it('should respond 200 with users trips', () => {
    return supertest(app)
      .get('/trips/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.exist;
      });
  });

  it.only('should respond 400 if no tripss exist', () => {
    return supertest(app)
      .get('/api/trips/1')
      .expect(400, { error: 'could not find any trips' });
  });
});
