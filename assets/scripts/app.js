'use strict'

const init = require('./life.js')

$(() => {
  // $('#start').on('click', (e) => {
  //   e.preventDefault()
  //   life.paused = !life.paused
  // })
  init(64, 64, 1)
})
