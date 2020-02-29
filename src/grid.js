import Cell from './cell.js';

const grid = {
    // position: 'fixed',
    // display: 'block',
    margin: '5px',
    border: '2px solid black'
    // background: '#000a64'
};

/**
 * Set grid cells
 * @param {Document} element 
 * @param {Number} size 
 */
let setGrid = function(element, size) {
    let cells = [];

    for (let i = 0; i < size; i++) {
        let cell = new Cell(i);
        let row = i >= 10 ? Math.floor(i/10) : 0;
        cell.setRow(row);
        cells.push(cell);
        element.append(cell.getElem());
    }
    return cells;
    
};

export { setGrid, grid };