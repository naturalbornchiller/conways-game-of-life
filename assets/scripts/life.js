
    // if (isFilled(x-1, y-1)) neighbors++
    // if (isFilled(x-1, y)) neighbors++
    // if (isFilled(x-1, y+1)) neighbors++
    // if (isFilled(x, y-1)) neighbors++
    // if (isFilled(x, y+1)) neighbors++
    // if (isFilled(x+1, y-1)) neighbors++
    // if (isFilled(x+1, y)) neighbors++
    // if (isFilled(x+1, y+1)) neighbors++


const canvas = $('#c').getContext('2d')
const currentGrid = []
canvas.strokeStyle = '#e1e1e1'
canvas.fillStyle = 'cadetBlue'

const isFilled = (x, y) => cells[x] && cells[x][y]
const countNeighbors = (x, y) => {
    const neighbors = [isFilled(x-1, y-1), isFilled(x-1, y), isFilled(x-1, y+1), isFilled(x, y-1), 
                    isFilled(x, y+1), isFilled(x+1, y-1), isFilled(x+1, y), isFilled(x+1, y+1)]
    return neighbors.filter(neighbor => neighbor === true).length
}

const deadOrAlive = (cell, count) => {

}

const updateGrid = () => {
    const nextGrid = []
    cells.forEach((row, x) => {
        nextGrid[x] = []
        row.forEach((cell, y) => {
            const count = countNeighbors(x, y)
            nextGrid[x][y] = deadOrAlive(cell, count)
        })
    })
}

const init = (height=64, width=64) => {
    for (let i = 0; i < width; i++) {
        cells[i] = []
        for (let j = 0; j < height; j++) {
            cells[i][j] = !!Math.floor(Math.random())
        }
    }
    updateGrid()
}
