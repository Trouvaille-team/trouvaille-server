'use strict';

const express = require('express');
const tripsService = require('./trips-service');

const tripsRouter = express.Router();

tripsRouter.route('/').get(async (req, res, next) => {
  try {
    const usersTrips = await tripsService.getUserTrips(req.app.get('db'));

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
