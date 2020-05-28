
require("dotenv").config()
const express = require("express");
const fetch = require("node-fetch");
var polyline = require("polyline");
const config = require("../config.js")

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
  },
  async getWaypoints(arr) {

    let res = []
    for (let i = 0; i < arr.length; i++) {
      console.log(i)
      const element = arr[i];
      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${element.lat},${element.lng}&radius=1500&type=tourist_attraction&key=${config.API_KEY}`
      try {
        const response = await fetch(url);
        const json = await response.json();
        json.results.map((place) => {
          res.push({ name: place.name, id: place.place_id })
        })
      } catch (error) {
        console.log(error);
      }
    }
    return res
  }
}
module.exports = waypointsService

