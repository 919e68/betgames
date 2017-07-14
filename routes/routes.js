const express = require('express')
const router = express.Router()
const db = require('../models/db')

router.get('/', (req, res) => {
  
  console.log('SESSION ID', req.session.id)
  res.render('layout/main')
})


router.get('/stream', (req, res) => {
  req.session.username = 'red'
  console.log(JSON.stringify(req.session, null, 2))
  console.log('SESSION ID', req.session.id)
  res.send('1')
})

module.exports = router