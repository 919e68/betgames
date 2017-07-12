module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Translator', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false
    },
    korean: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Translator',
    timestamps: true
  })
}