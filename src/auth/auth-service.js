/* eslint-disable strict */

const config = require('../config');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthService = {
  getUserName(db, userName) {
    return db('users').where({ userName }).first();
  },
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJWT(subject, payload) {
    return JWT.sign(payload, config.JWT_SECRET, {
      subject,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256',
    });
  },
  verifyJWT(token) {
    return JWT.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },
};

module.exports = AuthService;
