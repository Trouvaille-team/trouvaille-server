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
  let query = req.body.query
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${config.API_KEY}`;
  waypointsService.getPoints(url).then((data) => {
    data = { ...data, query }
    waypointsService.getWaypoints(data).then((places) => {

      const filteredList = Array.from(new Set(places.points.map(a => a.id)))
        .map(id => {
          return places.points.find(a => a.id === id)
        })
      places.points = filteredList
      res.send(200, JSON.stringify(places))
    })
  })
})
waypointsRouter.route('/nearby').post(jsonBodyParser, async (req, res, next) => {
  let coords = { points: [{ lat: req.body.lat, lng: req.body.lng }], query: req.body.query }
  waypointsService.getWaypoints(coords).then((places) => {
    res.send(200, JSON.stringify(places))
  })
})
module.exports = waypointsRouter

