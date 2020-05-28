'use strict';

module.exports = const interestsService = {
  getAll(db) {
    return db.from('interests').returning('*');
  },
};
