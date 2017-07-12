module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bet', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    drawNumber: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    oddId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    isWinner: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'Bets',
    timestamps: true
  })
}
