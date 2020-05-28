/* eslint-disable strict */
require("dotenv").config()
const express = require("express");
const jsonBodyParser = express.json();
const waypointsService = require("./waypointsService")
const config = require("../config.js")


const url = `https://maps.googleapis.com/maps/api/directions/json?origin=New+York&destination=Los+Angeles&key=${config.API_KEY}`;


function test() {
  waypointsService.getPoints(url).then((res) => {
    console.log(res)

  })
}
test()