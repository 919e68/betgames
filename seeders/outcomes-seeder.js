'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Outcomes', [
      // for hands
      {
        id: 1,
        betTypeId: 1,
        name: 'Hand 1 wins'
      },
      {
        id: 2,
        betTypeId: 1,
        name: 'Hand 2 wins'
      },
      {
        id: 3,
        betTypeId: 1,
        name: 'Hand 3 wins'
      },
      {
        id: 4,
        betTypeId: 1,
        name: 'Hand 4 wins'
      },
      {
        id: 5,
        betTypeId: 1,
        name: 'Hand 5 wins'
      },
      {
        id: 6,
        betTypeId: 1,
        name: 'Hand 6 wins'
      },

      // for baccarat main bets
      {
        id: 7,
        betTypeId: 2,
        name: 'Player'
      },
      {
        id: 8,
        betTypeId: 2,
        name: 'Banker'
      },
      {
        id: 9,
        betTypeId: 2,
        name: 'Tie'
      },

      // war of bets main ber
      {
        id: 10,
        betTypeId: 3,
        name: 'Dealer wins'
      },
      {
        id: 11,
        betTypeId: 3,
        name: 'Player wins'
      },
      {
        id: 12,
        betTypeId: 3,
        name: 'War'
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
