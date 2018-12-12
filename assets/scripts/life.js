const configurations = require('./preconfigurations.js')
let cells = []
let paused = true
const isFilled = (x, y) => cells[x] && cells[x][y]
const liveCount = cells => cells.flat().filter(cell => cell === true).length
const population = cells => cells.length < 10 ? liveCount(cells) : '~' + +(Math.ceil(liveCount(cells) / 50.0) * 50)
const deadOrAlive = (cell, count) => cell ? (count === 2 || count === 3) : count === 3
const countNeighbors = (x, y) => {
    const neighbors = [isFilled(x-1, y-1), isFilled(x-1, y), isFilled(x-1, y+1), isFilled(x, y-1), 
                       isFilled(x, y+1), isFilled(x+1, y-1), isFilled(x+1, y), isFilled(x+1, y+1)]
    return liveCount(neighbors)
}

const preconfigure = setting => {
    let config
    switch (setting) {
        default: // gosper glider gun
            config = configurations.glosperGlider
            break
    }

    config.forEach(coord => cells[coord[0]][coord[1]] = true)
}

const draw = (width=1512, height=512) => {
    let HTML = ''
    cells.forEach((row, x) => {
        row.forEach((cell, y) => {
            cell ? HTML += `<div id=[${x}][${y}] class="cell alive"></div>` : HTML += `<div id=[${x}][${y}] class="cell dead"></div>`
        })
    })
    $('#frame').html(HTML)

    setTimeout(() => {
        $('#count').text(population(cells))
        console.log(paused)
        if (!paused) update()
    }, 200)
}

const update = () => {
    cells = cells.map((row, x) => row.map((cell, y) => deadOrAlive(cell, countNeighbors(x, y))))
    draw()
}

const init = (width=64, height=64, preset=0) => {
    for (let i = 0; i < width; i++) {
        cells[i] = []
        for (let j = 0; j < height; j++) {
            cells[i][j] = preset ? false : Math.random() > .5
        }
    }
    if (preset) preconfigure(preset)
    update()
}

$('#container').on('hover', playGod)
const playGod = e => {
    const xPosition = e.clientX
    const yPosition = e.clienY
    console.log('X: ' + xPosition + ', Y: ' + yPosition)
}

/**
 * EVENT LISTENERS
 */
// Pause and play game
$('#start').on('click', () => {
    if (paused) {
      paused = false
      $('#start').css({color: 'blue'})
      update()
    } else {
      paused = true
      $('#start').css({color: 'black'})
    }
})

$('#reset').on('click', () => {
    paused = true
    init(64, 64, 1)
})

module.exports = {init}
