var fs        = require('fs')
var path      = require('path')
var Sequelize = require('sequelize')
var basename  = path.basename(module.filename)
var env       = process.env.NODE_ENV || 'development'
var config    = require(__dirname + '/../config/config.json')[env]
var db        = {}

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  
}).forEach(function(file) {
  var model = sequelize['import'](path.join(__dirname, file))
  db[model.name] = model
})

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

// // Game associations
db.Game.hasMany(db.GamePart, {
  foreignKey: 'gameId'
})
db.Game.hasMany(db.BetType, {
  foreignKey: 'gameId'
})
db.Game.hasMany(db.Draw, {
  foreignKey: 'gameId'
})

// // GamePart associations
db.GamePart.belongsTo(db.Game, {
  foreignKey: 'gameId'
})
db.GamePart.hasMany(db.Odd, {
  foreignKey: 'gamePartId'
})

// // Bet associations
db.Bet.belongsTo(db.Draw, {
  foreignKey: 'drawNumber'
})
db.Bet.belongsTo(db.User, {
  foreignKey: 'userId'
})
db.Bet.belongsTo(db.Odd, {
  foreignKey: 'oddId'
})

// // BetType associations
db.BetType.belongsTo(db.Game, {
  foreignKey: 'gameId'
})
db.BetType.hasMany(db.Outcome, {
  foreignKey: 'betTypeId'
})

// // Draw associations
db.Draw.belongsTo(db.Game, {
  foreignKey: 'gameId'
})
db.Draw.hasMany(db.Bet, {
  foreignKey: 'drawNumber'
})
db.Draw.hasMany(db.Odd, {
  foreignKey: 'drawNumber'
})



// // Odd associations
db.Odd.belongsTo(db.Draw, {
  foreignKey: 'drawNumber'
})
db.Odd.belongsTo(db.GamePart, {
  foreignKey: 'gamePartId'
})
db.Odd.belongsTo(db.Outcome, {
  foreignKey: 'outcomeId'
})
db.Odd.hasMany(db.Bet, {
  foreignKey: 'oddId'
})

// // Outcome associations
db.Outcome.belongsTo(db.BetType, {
  foreignKey: 'betTypeId'
})
db.Outcome.hasMany(db.Odd, {
  foreignKey: 'outcomeId'
})

// // User associations
db.User.hasMany(db.Bet, {
  foreignKey: 'userId'
})

module.exports = db
