'use strict';

const tripsService = {
  getUserTrips(db, userId) {
    return (
      db
        .from('trips')
        .select('*')
        //.leftJoin('trips.user_id', '=', 'users.id')
        .where('user_id', userId)
        .returning('trips.origin')
    );
  },
  addUserTrip(db, userPost) {
    return db
      .insert(userPost)
      .into('trips')
      .returning('*')
      .then((trips) => {
        return trips[0];
      });
  },
};

module.exports = tripsService;
