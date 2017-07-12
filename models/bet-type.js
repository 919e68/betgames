module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BetType', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    gameId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BetTypes',
    timestamps: true
  })
}
