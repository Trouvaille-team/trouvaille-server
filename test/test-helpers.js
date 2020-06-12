'use strict';
const tripsService = require('../src/trips/trips-service')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class MockUser {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

const createAuth = (mockUser, secret = process.env.JWT_SECRET) => {
  const token = jwt.sign({ id: mockUser.id }, secret, {
    subject: mockUser.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
};

const insertMockUser = (db) => {
  const mockUser = {
    "id": 1,
    "username": "userrrr",
    "email": "emaillll",
    "password": bcrypt.hashSync('cl3v3rP@sswerd', 10)
  }

  return db.transaction(async trx => {
    await trx.into('users').insert(mockUser)
    await trx.raw(`ALTER SEQUENCE trips_trip_id_seq RESTART WITH 1;`,)
  })
};

const insertTrip = (db) => {
  let testTrip = [{
    "origin": JSON.stringify("blah"),
    "destination": JSON.stringify("asjdf"),
    "waypoints": JSON.stringify("asdf"),
    "destination_name": JSON.stringify("asdf"),
    "user_id": "1"
  }]

  return db.transaction(async trx => {
    await trx.into('trips').insert(testTrip)
  })
};

function cleanTrip(db) {
  return db.transaction(trx =>
    trx.raw(
      `Truncate
        "trips"`
    )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE trips_trip_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('trips_trip_id_seq', 0)`)
        ]))
  );
}
function cleanUsers(db) {
  return db.transaction(trx =>
    trx.raw(
      `Delete from users`
    )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('users_id_seq', 0)`)
        ]))
  );
}


module.exports = {
  MockUser,
  createAuth,
  insertMockUser,
  insertTrip,
  cleanTrip, cleanUsers
};
