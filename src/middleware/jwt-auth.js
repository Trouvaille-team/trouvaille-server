/* eslint-disable strict */

const { jsonWebTokenError } = require('jsonwebtoken');
const AuthService = require('../auth/auth-service');

const requireAuth = async (req, res, next) => {
  const authToken = req.get('Authorization') || '';
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }
  try {
    const payload = AuthService.verifyJWT(bearerToken);
    const user = await AuthService.getUserName(req.app.get('db'), payload.sub);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized request' });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jsonWebTokenError) {
      return res.status(401).json({ error: 'Unauthorized request' });
    }
    next(error);
  }
};

module.exports = requireAuth;
