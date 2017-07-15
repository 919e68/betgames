const db = require('../../models/db')

let promises = []

promises.push(new Promise((resolve, reject) => {
  db.Draw.destroy({
    where: {},
    truncate: false
  }).then(count => {
    resolve({ 
      ok: true,
      table: 'Draws'
    })
  })
}))

promises.push(new Promise((resolve, reject) => {
  db.Odd.destroy({
    where: {},
    truncate: false
  }).then(count => {
    resolve({ 
      ok: true ,
      table: 'Odds'
    })
  })
}))

promises.push(new Promise((resolve, reject) => {
  db.Bet.destroy({
    where: {},
    truncate: false
  }).then(count => {
    resolve({ 
      ok: true,
      table: 'Bets'
    })
  })
}))

Promise.all(promises).then(res => {
  console.log(JSON.stringify(res, null, 2))
  process.exit()
})

