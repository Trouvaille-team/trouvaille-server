'use strict';

const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { TEST_DATABASE_URL } = require('../src/config');
const { insertMockUser, insertTrip, testTrip, cleanTrip, cleanUsers, makeKnexInstance, cleanTables } = require('./test-helpers');

describe('trips endpoint', function () {
  let db;

  before('make knex instance', () => {
    db = makeKnexInstance();
    app.set('db', db);
  });

  after('clear database', () => {
    // cleanUsers(db);
    // cleanTrip(db);
  });

  after('disconnect from db', () => db.destroy());

  beforeEach('cleanup', () => {
    // cleanTrip(db);
    return cleanUsers(db);
  })

  beforeEach('insert ', () => {
    return insertMockUser(db);
  });

  describe('while there is a data in the database', () => {
    beforeEach('insert ', () => {
      
      insertTrip(db);
    });

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
