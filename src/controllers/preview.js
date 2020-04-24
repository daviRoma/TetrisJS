import { setStyle, buildDOMElem } from '../utils.js';
import { ZBlock, SBlock, LBlock, JBlock, TBlock, QBlock, IBlock, type } from '../components/block.js';
import { Grid, grid_style } from '../components/grid.js';
import { Cell, cellAggregation } from '../components/cell.js';

const grid_size = 25;

/** 
 * Block Preview square.
 * @param {String} id
 */
let Preview = function(id) {
    let grid;
    let previewGrid;
    let block;
    let blockNumber = 1;

    let init = (function() {
        this.fieldId = id;

        previewGrid = { ...grid_style };
        previewGrid.top = '15%';
        previewGrid.left = '65%';
        previewGrid.height = '110px';
        previewGrid.width = '110px';

        grid = new Grid('preview_grid', 'preview', grid_size, previewGrid);
        grid.cells = this.setGridCells(grid.getContext(), grid_size);

    }).bind(this);

    this.setGrid = function (grid) {
        grid = grid;
    }

    this.getGrid = function () {
        return grid;
    }
    
    this.attach = function(parentElement){
        grid.attach(parentElement);
    };
  
    this.detach = function () {
        grid.detach();
    }

    this.handleEvent = function (eventType, callback) {
        grid.handleEvent(eventType, callback);
    }


    this.resetGrid = function() {
        for (let cell of grid.cells) {
            cell.resetCell();
        }
    };

    this.getBlock = function() {
        return block;
    };

    this.generateNextBlock = function() {
        let indexType = Math.floor(Math.random() * type.length);
        let center = 0;

        for (let cell of grid.cells) {
            if (cell.filled) {
                cell.resetCell();
            }
        }

        switch (type[indexType]) {
            case 'L':
                center = 12;
                block = new LBlock('LB' + blockNumber, 'RIGHT', center);
                break;

            case 'J':
                center = 12;
                block = new JBlock('JB' + blockNumber, 'RIGHT', center);
                break;

            case 'I':
                center = 12;
                block = new IBlock('IB' + blockNumber, 'LEFT', center);
                break;
            
            case 'T':
                center = 17;
                block = new TBlock('TB' + blockNumber, 'UP', center);
                break;
            
            case 'Q':
                center = 16;
                block = new QBlock('QB' + blockNumber, 'UP', center);
                break;

            case 'Z':
                center = 17;
                block = new ZBlock('ZB' + blockNumber, 'LEFT', center);
                break;

            case 'S':
                center = 17;
                block = new SBlock('SB' + blockNumber, 'LEFT', center);
                break;

            default: break;
        }
        block.setPositionSchema(5);

        block.setBlock(grid.cells, 5);
        blockNumber += 1;
    };

    this.setBackground = function (bgcolor) {
        previewGrid.background = bgcolor;
        this.setStyle(grid.getContext(), previewGrid);

        for (let cell of grid.cells) {
            cell.setDefaultColor(bgcolor);
        }
    }

    init();
};

Preview.prototype.setStyle = setStyle;
Preview.prototype.build = buildDOMElem;
Preview.prototype.setGridCells = cellAggregation;

export default Preview;