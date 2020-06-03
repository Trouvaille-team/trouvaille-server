'use strict';

const tripsService = {
  getUserTrips(db, userId) {
    let res = (
      db
        .from('trips')
        .select('*')
        //.leftJoin('trips.user_id', '=', 'users.id')
        .where('user_id', userId)
        .returning('trips.origin')
    );
    return deserialize(res)
  },
  addUserTrip(db, userPost) {
    return db
      .insert(serialize(userPost))
      .into('trips')
      .returning('*')
      .then((trips) => {
        return deserialize(trips[0]);
      });
  },
};

function serialize(trip) {
  return ({
    ...trip, origin: JSON.stringify(trip.origin), destination: JSON.stringify(trip.destination), waypoints: JSON.stringify(trip.waypoints)
  }
  )
}

function deserialize(trip) {
  return ({
    ...trip, origin: JSON.parse(trip.origin), destination: JSON.parse(trip.destination), waypoints: JSON.parse(trip.waypoints)
  }
  )
}

module.exports = tripsService;
