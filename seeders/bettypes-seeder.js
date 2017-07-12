'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('BetTypes', [
      {
        id: 1,
        gameId: 1,
        name: 'Hands'
      },
      {
        id: 2,
        gameId: 2,
        name: 'Main Bets'
      },
      {
        id: 3,
        gameId: 3,
        name: 'Main Bets'
      }
    ])
    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
