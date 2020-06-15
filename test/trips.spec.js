const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const { insertMockUser, insertTrip, cleanUsers, makeKnexInstance } = require('./test-helpers');

describe('trips endpoint', function () {
  let db;

  before('make knex instance', () => {
    db = makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  beforeEach('cleanup', () => {
    return cleanUsers(db);
  });

  beforeEach('insert ', () => {
    return insertMockUser(db);
  });

  describe('while there is a data in the database', () => {
    beforeEach('insert ', () => {
      return insertTrip(db);
    });

    it('should respond 200 with users trips', () => {
      return supertest(app)
        .get('/api/trips/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).to.exist;
        });
    });
  });

});
