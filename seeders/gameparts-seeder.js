'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('GameParts', [
      // for bet on poker
      {
        id: 1,
        gameId: 1,
        name: 'Bet'
      },
      {
        id: 2,
        gameId: 1,
        name: 'Preflop'
      },
      {
        id: 3,
        gameId: 1,
        name: 'Flop'
      },
      {
        id: 4,
        gameId: 1,
        name: 'Turn'
      },
      {
        id: 5,
        gameId: 1,
        name: 'River'
      },

      // for baccarat
      {
        id: 6,
        gameId: 2,
        name: 'Primary Bets'
      },
      {
        id: 7,
        gameId: 2,
        name: 'Player Card'
      },
      {
        id: 8,
        gameId: 2,
        name: 'Banker Card'
      },

      // for war of bets
      {
        id: 9,
        gameId: 3,
        name: 'Primary Bets'
      },
      {
        id: 10,
        gameId: 3,
        name: 'Player Card'
      },
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
