/* eslint-disable strict */
require('dotenv').config();
const express = require('express');
const jsonBodyParser = express.json();
const waypointsService = require('./waypointsService');
const config = require('../config.js');
const waypointsRouter = express.Router();
const fetch = require('node-fetch');

let origin = 'New+York';
let dest = 'Los+Angeles';

waypointsRouter.route('/').post(jsonBodyParser, async (req, res, next) => {
  let origin = req.body.origin;
  let dest = req.body.dest
  let query = req.body.query
  let radius = req.body.radius
  if (!origin || !dest || !query) {
    res.send(404, 'missing required field');
  }
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${config.API_KEY}`;
  waypointsService.getPoints(url, origin).then((data) => {
    if (!data || data.length < 1) {
      res.send(400, 'no route found');
    }
    data = { ...data, query, readius }
    waypointsService.getWaypoints(data).then((places) => {
      const filteredList = Array.from(
        new Set(places.points.map((a) => a.id))
      ).map((id) => {
        return places.points.find((a) => a.id === id);
      });
      places.points = filteredList;
      res.send(200, JSON.stringify(places));
    });
  });
});
waypointsRouter
  .route('/nearby')
  .post(jsonBodyParser, async (req, res, next) => {
    if (!req.body.lat || !req.body.lng || !req.body.query) {
      res.send(400, 'missing required fields');
    }
    let coords = {
      points: [{ lat: req.body.lat, lng: req.body.lng }],
      query: req.body.query,
    };
    waypointsService.getWaypoints(coords).then((places) => {
      if (places.points.length > 0) {
        res.send(200, JSON.stringify(places));
      } else {
        res.send(
          200,
          JSON.stringify({ points: ['no data found sorry buddy'] })
        );
      }
    });
  });

waypointsRouter.route('/photo').post(jsonBodyParser, async (req, res, next) => {
  console.log(req.body.photo_reference);
  let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${req.body.photo_reference}&key=${config.API_KEY}`;

  try {
    const response = await fetch(url);
    res.send(200, JSON.stringify(response.url));
  } catch (error) {
    console.log(error);
  }
});
module.exports = waypointsRouter;
