const configurations = require('./preconfigurations.js')
const canvas = document.getElementById('c').getContext('2d')
canvas.strokeStyle = '#e1e1e1'
canvas.fillStyle = '#000'
let cells = []
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
    canvas.clearRect(0, 0, width, height)
    cells.forEach((row, x) => {
        row.forEach((cell, y) => {
            canvas.beginPath()
            // makes a rectangle of size 8 at position (x*8, y*8)
            canvas.rect(x*8, y*8, 8, 8)
            if (cell) { // fills if cell
                canvas.fill()
            } else { // otherwise outline
                canvas.stroke()
            }
        })
    })
    setTimeout(() => {
        $('#count').text(population(cells))
        update()
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

module.exports = init
