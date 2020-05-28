'use strict';

const tripsService = {
  getUserTrips(db, user_id) {
    return db
      .from('trips')
      .select('*')
      .join('trips', 'trips.trip_id', '=', 'users.id')
      .where({ user_id });
  },
  addUserTrip(db, newTrip) {
    return db
      .insert(newTrip)
      .into('trips')
      .returning('*')
      .then((trips) => {
        return trips[0];
      });
  },
};

module.exports = tripsService;
