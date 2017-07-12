module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Game', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Games',
    timestamps: true
  })
}