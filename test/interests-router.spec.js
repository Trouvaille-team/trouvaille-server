'use strict';

const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { TEST_DATABASE_URL } = require('../src/config');

describe('States endpoint', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  it('should respond 200 with interests', () => {
    return supertest(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.exist;
      });
  });

  it('should respond 400 if no interests exist', () => {
    return supertest(app)
      .get('/')
      .expect(400, { error: 'could not find any interests' });
  });
});
