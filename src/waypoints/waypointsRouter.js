/* eslint-disable strict */
require("dotenv").config()
const express = require("express");
const jsonBodyParser = express.json();
const waypointsService = require("./waypointsService")
const config = require("../config.js")
const waypointsRouter = express.Router();


let origin = "New+York"
let dest = "Los+Angeles"
const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${config.API_KEY}`;

waypointsRouter.route("/").get(jsonBodyParser, async (req, res, next) => {
  waypointsService.getPoints(url).then((data) => {
    waypointsService.getWaypoints(data).then((places) => {
      res.send(200, places)
    })
  })

})
module.exports = waypointsRouter

