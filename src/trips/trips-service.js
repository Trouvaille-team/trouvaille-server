'use strict';

const tripsService = {
  getUserTrips(db, user_id) {
    return db.from('trips').select('*').where(user_id, 'trips.trip_id');
  },
  getUserId(db, username) {
    return db.from('users').select('id').where({ username });
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
