module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Odd', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    drawNumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    gamePartId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    outcomeId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    odds: {
      type:  DataTypes.FLOAT,
      allowNull: false
    },
    isWinner: {
      type:  DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    }
  }, {
    tableName: 'Odds',
    timestamps: true
  })
}