
require("dotenv").config()
const express = require("express");
const fetch = require("node-fetch");
const config = require("../config.js")

const waypointsService = {
  async getPoints(url, origin) {
    let points = []
    let endCoords = {}
    try {
      const response = await fetch(url);
      const json = await response.json();
      origin = origin.split(",")
      json.routes[0].legs[0].steps.map((step) => {
        if (Math.abs(step.end_location.lat - parseFloat(origin[0])) > 0.03 && Math.abs(step.end_location.lng - parseFloat(origin[1])) > 0.03) {
          points.push(step.end_location);
        }
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
      console.log(i)
      const element = obj.points[i];
      let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${obj.query.join("+OR+")}&type=tourist_attraction&location=${element.lat},${element.lng}&radius=${obj.radius ? obj.raius : 10000}&key=${config.API_KEY}`

      try {
        const response = await fetch(url);
        const json = await response.json();
        json.results.map((place) => {
          points.push({
            name: place.name, id: place.place_id, coords: place.geometry.location, photoInfo: place.photos
          })
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

