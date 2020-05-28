const express = require("express");
const fetch = require("node-fetch");
var polyline = require("polyline");

const waypointsService = {
  async getPoints(url) {
    let points = []
    try {
      const response = await fetch(url);
      const json = await response.json();
      json.routes[0].legs[0].steps.map((step) => {
        points.push(step.end_location);
      });
      return points
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = waypointsService
