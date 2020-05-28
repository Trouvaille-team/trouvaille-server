/* eslint-disable strict */
require("dotenv").config()
const express = require("express");
const jsonBodyParser = express.json();
const waypointsService = require("./waypointsService")
const config = require("../config.js")
const waypointsRouter = express.Router();


let origin = "New+York"
let dest = "Los+Angeles"


waypointsRouter.route("/").post(jsonBodyParser, async (req, res, next) => {
  let origin = req.body.origin;
  let dest = req.body.dest
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${config.API_KEY}`;
  waypointsService.getPoints(url).then((data) => {
    waypointsService.getWaypoints(data).then((places) => {
      res.send(200, JSON.stringify(places))
    })
  })
})
waypointsRouter.route('/nearby').post(jsonBodyParser, async (req, res, next) => {
  let coords = [{ lat: req.body.lat, lng: req.body.lng }]
  console.log(coords)
  waypointsService.getWaypoints(coords).then((places) => {
    res.send(200, JSON.stringify(places))
  })
})
module.exports = waypointsRouter

