
const configurations = {
    glosperGlider: [[1, 5],[1, 6],[2, 5],[2, 6],[11, 5],[11, 6],
                    [11, 7],[12, 4],[12, 8],[13, 3],[13, 9],[14, 3],
                    [14, 9],[15, 6],[16, 4],[16, 8],[17, 5],[17, 6],
                    [17, 7],[18, 6],[21, 3],[21, 4],[21, 5],[22, 3],
                    [22, 4],[22, 5],[23, 2],[23, 6],[25, 1],[25, 2],
                    [25, 6],[25, 7],[35, 3],[35, 4],[36, 3],[36, 4],

                    // Random Cells
                    // If you wait enough time these will eventually
                    // take part in destroying the glider gun, and
                    // the simulation will be in a "static" state.
                    [60, 47],[61,47],[62,47],
                    [60, 48],[61,48],[62,48],
                    [60, 49],[61,49],[62,49],
                    [60, 51],[61,51],[62,51]],

    spiralFlower: [[30,33],[30,36],[31,37],[31,38],[30,39],[29,38],
                   [29,37],[33,33],[34,34],[35,34],[36,33],[35,32],
                   [34,32],[30,30],[31,29],[31,28],[30,27],[29,28],
                   [29,29],[27,33],[26,34],[26,32],[25,32],[24,33],
                   [25,34],[37,35],[28,40],[23,31],[32,26]]
}

module.exports = configurations