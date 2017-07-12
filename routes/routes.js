const express = require('express')
const router = express.Router()
const db = require('../models/db')

router.get('*', (req, res) => {
  res.render('layout/main')
})

router.get('/stream', (req, res) => {
  res.send('1')
})

module.exports = router