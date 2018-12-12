const canvas = document.getElementById('c').getContext('2d')
canvas.strokeStyle = '#e1e1e1'
canvas.fillStyle = 'cadetBlue'
let cells = []

const isFilled = (x, y) => cells[x] && cells[x][y]
const deadOrAlive = (cell, count) => (cell ? (count === 2 || count === 3) : count === 3)
const countNeighbors = (x, y) => {
    const neighbors = [isFilled(x-1, y-1), isFilled(x-1, y), isFilled(x-1, y+1), isFilled(x, y-1), 
                    isFilled(x, y+1), isFilled(x+1, y-1), isFilled(x+1, y), isFilled(x+1, y+1)]
    return neighbors.filter(neighbor => neighbor === true).length
}

const draw = (width=600, height=400) => {
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
    setTimeout(() => update(), 70)
}

const update = () => {
    cells = cells.map((row, x) => {
        return cells[x] = row.map((cell, y) => {
            return cells[x][y] = deadOrAlive(cell, countNeighbors(x, y))
        })
    })
    draw()
}

const init = (width=64, height=64) => {
    for (let i = 0; i < width; i++) {
        cells[i] = []
        for (let j = 0; j < height; j++) {
            cells[i][j] = !!Math.floor(Math.random())
        }
    }
    update()
}

module.exports = init
