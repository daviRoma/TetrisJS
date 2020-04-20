import Cell from './cell.js';

const grid_style = {
    margin: '5px',
    border: '2px solid black',
    background: 'white'
};

/**
 * Set grid cells
 * @param {Document} element 
 * @param {Number} size 
 */
let grid = function(element, size) {
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

export { grid, grid_style};