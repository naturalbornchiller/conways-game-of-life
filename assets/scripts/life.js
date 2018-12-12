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
        case 1:
            config = configurations.spiralFlower
            break
        case 2:
            config = configurations.spiralFlower2
            break
        case 3:
            config = configurations.glosperGlider
            break
        case 4:
            config = new Array(64).map(() => new Array(64).map(cell => Math.random > .5))
        default: // gosper glider gun
            
    }

    config.forEach(coord => cells[coord[0]][coord[1]] = true)
}

const draw = (width=1512, height=512) => {
    let HTML = ''
    cells.forEach((row, x) => {
        row.forEach((cell, y) => {
            cell ? HTML += `<div id="${x}-${y}" class="cell alive"></div>` : HTML += `<div id="${x}-${y}" class="cell dead"></div>`
        })
    })

    $('#frame').html(HTML)

    setTimeout(() => {
        $('#count').text(population(cells))
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
            cells[i][j] = false
        }
    }
    if (preset) preconfigure(preset)
    update()
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
// Reset game
$('#reset').on('click', () => {
    paused = true
    $('#start').css({color: 'black'})
    init(64, 64, 1)
})
// Play god
let isDown = false
$(document).mousedown(() => isDown = true).mouseup(() => isDown = false)
$('#frame').on('mouseover', '.cell', function (e) {
    if (isDown) {
        const coords = $(this).attr('id').split('-')
        cells[parseInt(coords[0])][parseInt(coords[1])] = !cells[parseInt(coords[0])][parseInt(coords[1])]
        console.log(coords + ' = ' + cells[parseInt(coords[0])][parseInt(coords[1])])
        $(this).toggleClass('dead')
    }
}).on('click', '.cell', function (e) {
    const coords = $(this).attr('id').split('-')
    cells[parseInt(coords[0])][parseInt(coords[1])] = !cells[parseInt(coords[0])][parseInt(coords[1])]
    console.log(coords + ' = ' + cells[parseInt(coords[0])][parseInt(coords[1])])
    $(this).toggleClass('dead')
})


module.exports = {init}


// stretch goals: implement color logic! 