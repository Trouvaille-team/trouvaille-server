'use strict';

const knex = require('knex');

const app = require('../src/app');

describe.only('waypoints endpoints', () => {
  describe('/', () => {
    const body = {
      origin: "43.030898699999995,-87.98246619999999",
      dest: "Chicago",
      origin: "43.030898699999995,-87.98246619999999",
      query: ["Camping", "Monuments", "Parks"],
      radius: 0
    }
    it('responds 200 with a list of points', () => {
      return supertest(app)
        .post('/api/waypoints')
        .send(body)
    })
  })

});
