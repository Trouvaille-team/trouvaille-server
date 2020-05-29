'use strict';

const interestsService = {
  getAll(db) {
    return db.from('interests').returning('*');
  },
};

module.exports = interestsService;
