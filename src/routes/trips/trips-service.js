const tripsService = {
  getUserTrips(db, userId) {
    return (
      db
        .from('trips')
        .select('*')
        .where('user_id', userId)
    ).then((res) => {
      return this.deserialize(res)
    })
  },
  addUserTrip(db, userPost) {
    return db
      .insert(this.serialize(userPost))
      .into('trips')
      .returning('*')
      .then((trips) => {
        return "posted"
      }).then((data) => {
        return data
      })
  },
  serialize(trip) {
    return ({
      ...trip, origin: JSON.stringify(trip.origin), destination: JSON.stringify(trip.destination), waypoints: JSON.stringify(trip.waypoints)
    }
    )
  },
  deserialize(trip) {
    let arr = []
    for (let i = 0; i < trip.length; i++) {
      const element = trip[i];
      {
        arr.push({
          origin: JSON.parse(element.origin), destination: JSON.parse(element.destination), waypoints: JSON.parse(element.waypoints), trip_id: element.trip_id, user_id: element.user_id, destination_name: element.destination_name
        })
      }
    }
    return arr
  }
};



module.exports = tripsService;
