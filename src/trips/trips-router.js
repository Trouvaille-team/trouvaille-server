'use strict';

const express = require('express');
const tripsService = require('./trips-service');

const tripsRouter = express.Router();
const jsonBodyParser = express.json();

tripsRouter.route('/').get(async (req, res, next) => {
  try {
    const id = await tripsService.getUserId(req.app.get('db'), 'bleek42');
    const usersTrips = await tripsService.getUserTrips(
      req.app.get('db'),
      id[0].id
    );

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

tripsRouter
  .route('/')
  .post(jsonBodyParser, async (req, res, next) => {
    try {
      const { origin, destination, waypoints, user_id } = req.body;
      const userPost = { origin, destination, waypoints, user_id };
      console.log(origin, destination, waypoints, user_id)
      const newTrip = await tripsService.addUserTrip(
        req.app.get('db'),
        userPost
      );

      if (!newTrip) {
        res.status(400).json({
          error: 'cannot add new trip',
        });
      }

      res.status(200).json(newTrip);
    } catch (error) {
      next(error);
    }
  });

module.exports = tripsRouter;
