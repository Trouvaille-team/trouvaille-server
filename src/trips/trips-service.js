'use strict';

const tripsService = {
  getUserTrips(db, trip_id) {
    return db
      .from('trips')
      .select('trips.*')
      .leftJoin('users', 'users.id', '=', 'trips.trip_id')
      .where('trip_id', trip_id);
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
