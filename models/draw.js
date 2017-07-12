module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Draw', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    gameId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    drawNumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    winner: {
      type: DataTypes.STRING,
      allowNull: true
    },
    winningNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    winningSymbol: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
  }, {
    tableName: 'Draws',
    timestamps: true
  })
}