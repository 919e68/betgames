module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Outcome', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    betTypeId: {
      type: DataTypes.BIGINT,
      allowNull: false
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
    tableName: 'Outcomes',
    timestamps: true
  })
}