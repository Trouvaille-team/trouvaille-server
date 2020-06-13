const app = require('../src/app');

describe('waypoints endpoints', function () {
  this.timeout(10000);
  describe('/', () => {
    const body = {
      origin: '43.030898699999995,-87.98246619999999',
      dest: 'Chicago',
      query: ['Camping', 'Monuments', 'Parks'],
      radius: 5000
    };
    it('responds 200 with a list of points', () => {
      return supertest(app)
        .post('/api/waypoints')
        .send(body)
        .expect(((res) => {
          expect(res.body).to.exist;
        }));
    });
  });

});
