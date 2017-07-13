module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bet', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'Bets',
    timestamps: true
  })
}
