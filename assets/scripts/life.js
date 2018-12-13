const configurations = require('./preconfigurations.js')
let cells = []
let paused = true
let generation = -1
const rng = () => Math.floor(Math.random()*4)
const isFilled = (x, y) => cells[x] && cells[x][y]
const liveCount = cells => cells.flat().filter(cell => cell === true).length
const population = cells => liveCount(cells) > 10 ? '~' + +(Math.ceil(liveCount(cells) / 10.0) * 10) : liveCount(cells)
const deadOrAlive = (cell, count) => cell ? (count === 2 || count === 3) : count === 3
const countNeighbors = (x, y) => {
    const neighbors = [isFilled(x-1, y-1), isFilled(x-1, y), isFilled(x-1, y+1), isFilled(x, y-1), 
                       isFilled(x, y+1), isFilled(x+1, y-1), isFilled(x+1, y), isFilled(x+1, y+1)]
    return liveCount(neighbors)
}

const preconfigure = setting => {
    let config
    switch (setting) {
        case 2: // glosper glider
            config = configurations.glosperGlider
            break
        case 3: // spiral flower
            config = configurations.spiralFlower
            break
        case 4: // spiral flower 2
            config = configurations.spiralFlower2
            break
        default:
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
        generation++
        $('#count').text(population(cells))
        $('#generation').text(generation)
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
            if (preset === 0) {
                cells[i][j] = false
            } else if (preset === 1) {
                cells[i][j] = Math.random() < .5
            }
        }
    }
    if (preset > 1) preconfigure(preset)
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
    generation = -1
    paused = true
    $('#start').css({color: 'black'})
    init(64, 64, 0)
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