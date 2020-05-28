'use strict';

const express = require('express');
const tripsService = require('./trips-service');

const tripsRouter = express.Router();

tripsRouter.route('/').get(async (req, res, next) => {
  try {
    const user = await tripsService.getUserId(req.app.get('db'), 'bleek42');
    const usersTrips = await tripsService.getUserTrips(req.app.get('db'), user);

    if (!usersTrips) {
      res.status(400).json({
        error: 'cannot find any existing trips',
      });
    }

    res.status(200).json(usersTrips);
  } catch (error) {
    next(error);
  }
});

module.exports = tripsRouter;
