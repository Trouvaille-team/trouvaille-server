'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class mockUser {
  constructor(id, username, email, password) {
    this.id = id;
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

const insertMockUser = (db, mockUser) => {
  //const mockUser = new testUser(user);
  mockUser.password = bcrypt.hashSync('cl3v3rP@sswerd', 10);
  return db.into('users').insert(mockUser);
};

module.exports = {
  mockUser,
  createAuth,
  insertMockUser,
};