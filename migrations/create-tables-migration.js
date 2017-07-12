'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    // 1
    queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        email: Sequelize.STRING,
        currentBalance: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )


    // 2
    queryInterface.createTable(
      'Games',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          unique: true
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )


    // 3
    queryInterface.createTable(
      'GameParts',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          unique: true
        },
        gameId: Sequelize.BIGINT,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )


    // 4
    queryInterface.createTable(
      'BetTypes',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          unique: true
        },
        gameId: Sequelize.BIGINT,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )


    // 5
    queryInterface.createTable(
      'Outcomes',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          unique: true
        },
        betTypeId: Sequelize.BIGINT,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )


    // 6
    queryInterface.createTable(
      'Draws',
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        gameId: Sequelize.BIGINT,
        drawNumber: Sequelize.BIGINT,
        winner: Sequelize.STRING,
        winningNumber: Sequelize.STRING(20),
        winningSymbol: Sequelize.STRING(20),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )


    // 7
    queryInterface.createTable(
      'Odds',
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        drawNumber: Sequelize.BIGINT,
        gamePartId: Sequelize.BIGINT,
        outcomeId: Sequelize.BIGINT,
        odds: Sequelize.FLOAT,
        isWinner: {
          type:  Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: null
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )


    // 8
    queryInterface.createTable(
      'Bets',
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        drawNumber: Sequelize.BIGINT,
        userId: Sequelize.BIGINT,
        oddId: Sequelize.BIGINT,
        amount: Sequelize.FLOAT,
        isWinner: Sequelize.BOOLEAN,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )

    queryInterface.createTable(
      'Translator',
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        word: Sequelize.STRING,
        korean: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Users')
    queryInterface.dropTable('Games')
    queryInterface.dropTable('GameParts')
    queryInterface.dropTable('BetTypes')
    queryInterface.dropTable('Outcomes')
    queryInterface.dropTable('Draws')
    queryInterface.dropTable('Odds')
    queryInterface.dropTable('Bets')
    queryInterface.dropTable('Translator')
  }
};
