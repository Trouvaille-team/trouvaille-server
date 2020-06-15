/* eslint-disable strict */
const express = require('express');
const authService = require('./auth-service');
const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.route('/login').post(jsonBodyParser, async (req, res, next) => {
  const { username, password, email } = req.body;
  const reqUser = { username, password, email };
  for (const [key, value] of Object.entries(reqUser))
    if (value === null) {
      return res.status(400).json({
        error: `${key} missing in request body`,
      });
    }
  try {
    const userInDb = await authService.getUserName(
      req.app.get('db'),
      reqUser.username
    );

    if (!userInDb)
      return res.status(400).json({
        error: 'incorrect username and/or password',
      });

    const checkMatch = await authService.comparePassword(
      reqUser.password,
      userInDb.password
    );
      

    if (!checkMatch)
      return res.status(400).json({
        error: 'incorrect username and/or password',
      });

    const subject = userInDb.username;
    const payload = {
      user_id: userInDb.id,
    };
    res.send({
      authToken: authService.createJwt(subject, payload),
      user_id: userInDb.id
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
