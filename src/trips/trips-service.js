'use strict';

const tripsService = {
  getUserTrips(db, userId) {
    return (
      db
        .from('trips')
        .select('*')
        //.leftJoin('trips.user_id', '=', 'users.id')
        .where('user_id', userId)
        .returning('*')
    ).then((res) => {
      return deserialize(res)
    })
  },
  addUserTrip(db, userPost) {
    return db
      .insert(serialize(userPost))
      .into('trips')
      .returning('*')
      .then((trips) => {
        return deserialize(trips[0]);
      }).then((data) => {
        return data
      })
  },
};

function serialize(trip) {
  return ({
    ...trip, origin: JSON.stringify(trip.origin), destination: JSON.stringify(trip.destination), waypoints: JSON.stringify(trip.waypoints)
  }
  )
}

function deserialize(trip) {
  let arr = []
  for (let i = 0; i < trip.length; i++) {
    const element = trip[i];
    {
      arr.push({
        origin: JSON.parse(element.origin), destination: JSON.parse(element.destination), waypoints: JSON.parse(element.waypoints), trip_id: element.trip_id, user_id: element.user_id
      })
    }
    return arr
  }
}

module.exports = tripsService;
