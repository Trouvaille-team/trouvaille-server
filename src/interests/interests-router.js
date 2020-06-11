'use strict';

const express = require('express');
const interestsService = require('./interests-service');

const interestsRouter = express.Router();

interestsRouter.route('/').get(async (req, res, next) => {
  try {
    const findAllInts = await interestsService.getAll(req.app.get('db'));

    if (!findAllInts) {
      res.status(400).json({
        error: 'could not find any interests',
      });
    }

    res.status(200).json(findAllInts);
  } catch (error) {
    next(error);
  }
});
