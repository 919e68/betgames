'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Mick',
        lastName: 'Brady',
        username: 'mick',
        password: 'mick',
        email: 'gristneck@gmail.com',
        currentBalance: 1000
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
