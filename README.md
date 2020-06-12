# Trouvaille Server

  * The server uses six endpoints:
      
      * /api/waypoints
      * /api/waypoints/nearby
      * /api/auth/login
      * /api/users/new
      * /api/trips/
      * /api/trips/:user_id

  * The base url for the server is: https://trouvaille-app.herokuapp.com

  * /waypoints/ POST
    * Request: https://trouvaille-app.herokuapp.com/waypoints/
    * Posts the users parameters for creating the trip, including the origin, destination, query, and radius
    * Response: 200 and a filtered list of waypoints based off of user parameters. These are displayed one at a time to the user on the front end as an object with a points key and an array of objects for the individual points including the name and photo information: {"points":[{"name":"Houston Funplex","id":"ChIJJzjGMevdQIYRTcNvou1nPNs","coords":{"lat":29.6894875,"lng":-95.6252598},"photoInfo":[{"height":3024,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/110466522104196901664\">JONATHAN CHEN</a>"],"photo_reference":"CmRaAAAAWeuQboLQQ5fO3jmkDQAvejv82JqoAoGDFAwuc7t3Eagq0RidRBfUl7eInZ96gQMXqbpVM2nIFNwoDNSagWPqHnWKzuhxbqeOrDT0hPk134xq34C2PXYNSGbbMNI4PsJtEhDgrX0Xy2XbL5eUz6XLqSPnGhRz62NOW1UTBVCimyTQWIycvebHug","width":4032}]}
    * Auth Required: No

  * /waypoints/nearby POST
    * Request: https://trouvaille-app.herokuapp.com/waypoints/nearby
    * Posts users lat:29.635970099999998 and lng:-95.5930646 and returns a list of nearby tourist attractions
    * Response: 200. and an object with a points key and an array of objects for the individual points including the name and photo information: {"points":[{"name":"Houston Funplex","id":"ChIJJzjGMevdQIYRTcNvou1nPNs","coords":{"lat":29.6894875,"lng":-95.6252598},"photoInfo":[{"height":3024,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/110466522104196901664\">JONATHAN CHEN</a>"],"photo_reference":"CmRaAAAAWeuQboLQQ5fO3jmkDQAvejv82JqoAoGDFAwuc7t3Eagq0RidRBfUl7eInZ96gQMXqbpVM2nIFNwoDNSagWPqHnWKzuhxbqeOrDT0hPk134xq34C2PXYNSGbbMNI4PsJtEhDgrX0Xy2XbL5eUz6XLqSPnGhRz62NOW1UTBVCimyTQWIycvebHug","width":4032}]}
    * Auth required: No

  * /api/auth/login POST
    * Request: https://trouvaille-app.herokuapp.com/api/auth/login
    * Posts the users credentials and compares them to the credentials already in the database
    * Response: 200 and an object containing the auth token and the user id.{"authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1OTE5OTk3ODksImV4cCI6MTU5MjAxMDU4OSwic3ViIjoiZG91Z2xhcyJ9.doLng-eEbTk30D6qYHRZ5JhNaK59KiYd8Ofst0LhpdU","user_id":1}
    * Auth required: Yes

  * /api/users/new POST
    * Request: https://trouvaille-app.herokuapp.com/api/users/new
    * Posts the users credentials to the database after validating them agains the required security checks
    * Response: 201 and sends the user object back{"username":"blahblah","email":"woeiraoieu@oiufoiy.com"}
    * Auth required: Yes

  * /api/trips POST
    * Request: https://trouvaille-app.herokuapp.com/api/trips
    * Posts the users data for the created trip.
    * Response: 200 and "Posted"
    * Auth required: No

  * /api/trips/:user_id GET
    * Request: https://trouvaille-app.herokuapp.com/api/trips/:user_id
    * Gets the users saved trips from the database
    * Response: 200 and an array of objects containing the data of the users previous trips: [{"origin":{"lat":29.635970099999998,"lng":-95.5930646},"destination":{"lat":30.2671732,"lng":-97.74313579999999},"waypoints":[{"name":"Fort Bend Museum","id":"ChIJET3ZhXoeQYYRxutHRlDF36U","coords":{"lat":29.5803343,"lng":-95.76207040000001},"photoInfo":[{"height":3120,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/113277755790869877833\">Dee King</a>"],"photo_reference":"CmRaAAAAffELXTe326OCNSQbNgzUvePZDJjLm4j6xdqCyVofC7A20Dxme5RDCAeW1cse-AZseFlrhm2ZomQgdrOYTobtVOYWyxzNLwFUh9kuDFRGdUIcpHcP4aY7u-18lyWj5THnEhBq1-SrmgLBoNdcjXDfwVkkGhTC9iesw8JpYO33ujTPBhjXlugtfw","width":4160}]}]]
    * Requires Auth: Yes

# Team Members:
  * Brandon Leek
  * Douglas Miner
  * Hannah Thorpe
  * Ian Drews
  * Trina McLeary
  * Zac Barreca

# Live Link:
  * https://trouvaille.now.sh

# Tech Stack (Server):
  * JavaScript
  * Node.js
  * Express
  * Mocha
  * Chai
  * CORS
  * Helmet
  * Morgan
  * PostgreSQL
  * Postgrator
  * nodemon
  * supertest