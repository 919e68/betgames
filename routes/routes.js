const express = require('express')
const router = express.Router()
const db = require('../models/db')

let reactRoutes = [
  '/poker',
  '/baccarat',
  '/war',
  '/results',
  '/history',
  '/watch/:game/:drawNumber'
]

for (let i = 0; i < reactRoutes.length; i++) {
  router.get(reactRoutes[i], (req, res) => {
    res.render('layout/main')
  })
}

router.get('/login', (req, res) => {
  res.render('layout/login')
})

router.get('/stream/refresh', (req, res) => {
  res.send('1')
})

module.exports = router