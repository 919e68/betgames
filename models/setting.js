module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Setting', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Settings',
    timestamps: true
  })
}