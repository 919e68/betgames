const fs = require('fs')
const db = require('../models/db')
const moment = require('moment')
const user = require('../graphql/types/user')

let where = {}
let date = '2017-07-14'

where.updatedAt = {
  $gte: moment(`2017-07-14`).startOf('day').utc().format('YYYY-MM-DD HH:mm'),
  $lte: moment(`2017-07-14`).endOf('day').utc().format('YYYY-MM-DD HH:mm')
}

console.log(moment(`2017-07-14`).startOf('day').utc().format('YYYY-MM-DD HH:mm'), moment(`2017-07-14`).endOf('day').utc().format('YYYY-MM-DD HH:mm'))

// db.Draw.findAll({
//   where: where,
//   order: [
//     ['id', 'DESC']
//   ]
// }).then(draws => {
 
// }).catch(err => {
 
// })