'use strict';

const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { TEST_DATABASE_URL } = require('../src/config');
const { insertMockUser, insertTrip, testTrip, cleanTrip, cleanUsers } = require('./test-helpers');

describe('trips endpoint', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL,
    });
    app.set('db', db);
  });
  after('disconnect from db', () => db.destroy());

  after('clear database', () => {
    cleanTrip(db)
    cleanUsers(db)
  })
  describe("some bullshit", () => {
    beforeEach('insert shit', () => {
      insertMockUser(db);
      insertTrip(db)
    })

    it('should respond 200 with users trips', () => {
      return supertest(app)
        .get('/api/trips/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).to.exist;
        });
    })
  })

});
