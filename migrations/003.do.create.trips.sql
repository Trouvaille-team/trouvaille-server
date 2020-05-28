CREATE TABLE trips (
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    waypoints TEXT NOT NULL,
    trip_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);