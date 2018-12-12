'use strict'

const life = require('./life.js')
const rng = () => Math.floor(Math.random()*4)
$(() => {
  life.init(64, 64, rng)
})
