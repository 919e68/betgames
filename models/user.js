module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currentBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'Users',
    timestamps: true
  })
}