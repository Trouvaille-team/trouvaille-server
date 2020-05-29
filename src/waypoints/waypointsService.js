
require("dotenv").config()
const express = require("express");
const fetch = require("node-fetch");
var polyline = require("polyline");
const config = require("../config.js")

const waypointsService = {
  async getPoints(url) {
    console.log("***************", url)
    let points = []
    let endCoords = {}
    try {
      const response = await fetch(url);
      const json = await response.json();
      json.routes[0].legs[0].steps.map((step) => {
        points.push(step.end_location);
        endCoords = json.routes[0].legs[0].end_location
      });
      return { points, endCoords }
    } catch (error) {
      console.log(error);
    }
  },
  async getWaypoints(obj) {
    endCoords = obj.endCoords
    let points = []
    for (let i = 0; i < obj.points.length; i++) {
      const element = obj.points[i];
      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${element.lat},${element.lng}&radius=6000&type=tourist_attraction&key=${config.API_KEY}`
      console.log(url)
      try {
        const response = await fetch(url);
        const json = await response.json();
        json.results.map((place) => {
          points.push({ name: place.name, id: place.place_id, coords: place.geometry.location })
        })
      } catch (error) {
        console.log(error);
      }
    }
    console.log(points)
    return { points, endCoords }
  }
}
module.exports = waypointsService

