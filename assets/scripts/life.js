const canvas = document.getElementById('c').getContext('2d')
canvas.strokeStyle = '#e1e1e1'
canvas.fillStyle = '#000'
let cells = []

const preconfigure = () => {
    [
        // Gosper glider gun
        [1, 5],[1, 6],[2, 5],[2, 6],[11, 5],[11, 6],
        [11, 7],[12, 4],[12, 8],[13, 3],[13, 9],[14, 3],
        [14, 9],[15, 6],[16, 4],[16, 8],[17, 5],[17, 6],
        [17, 7],[18, 6],[21, 3],[21, 4],[21, 5],[22, 3],
        [22, 4],[22, 5],[23, 2],[23, 6],[25, 1],[25, 2],
        [25, 6],[25, 7],[35, 3],[35, 4],[36, 3],[36, 4],
        
        // Random cells
        // If you wait enough time these will eventually take part
        // in destroying the glider gun, and the simulation will be in a "static" state.
        [60, 47],[61,47],[62,47],
        [60, 48],[61,48],[62,48],
        [60, 49],[61,49],[62,49],
        [60, 51],[61,51],[62,51],
    ]
    .forEach(coord => cells[coord[0]][coord[1]] = true)
}

const isFilled = (x, y) => cells[x] && cells[x][y]
const deadOrAlive = (cell, count) => cell ? (count === 2 || count === 3) : count === 3
const countNeighbors = (x, y) => {
    const neighbors = [isFilled(x-1, y-1), isFilled(x-1, y), isFilled(x-1, y+1), isFilled(x, y-1), 
                    isFilled(x, y+1), isFilled(x+1, y-1), isFilled(x+1, y), isFilled(x+1, y+1)]
    return neighbors.filter(neighbor => neighbor === true).length
}

const draw = (width=1512, height=512) => {
    canvas.clearRect(0, 0, width, height)
    cells.forEach((row, x) => {
        row.forEach((cell, y) => {
            canvas.beginPath()
            canvas.rect(x*8, y*8, 8, 8)
            if (cell) {
                canvas.fill()
            } else {
                canvas.stroke()
            }
        })
    })
    setTimeout(() => update(), 200)
}

const update = () => {
    cells = cells.map((row, x) => {
        return row.map((cell, y) => {
            return deadOrAlive(cell, countNeighbors(x, y))
        })
    })
    draw()
}

const init = (width=64, height=64) => {
    for (let i = 0; i < width; i++) {
        cells[i] = []
        for (let j = 0; j < height; j++) {
            cells[i][j] = false //Math.random() > .5
        }
    }
    preconfigure()
    update()
}

module.exports = init
