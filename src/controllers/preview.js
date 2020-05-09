import { buildDOMElem } from '../resources/utils';
import { ZBlock, SBlock, LBlock, JBlock, TBlock, QBlock, IBlock } from '../components/block';
import Grid from '../components/grid';
import Cell from '../components/cell';
import { PREVIEW_SIZE, PREVIEWGROUND_STYLE, PREVIEWGROUND_INDEX, BLOCKS_TYPE } from '../resources/configuration';

/** 
 * Preview groud controller class.
 * @param {String} id
 */
let Preview = function(id) {
    let grid;
    let block;
    let blockNumber = 1;

    let init = (function() {
        this.fieldId = id;

        grid = new Grid('preview_grid', 'preview', PREVIEW_SIZE, PREVIEWGROUND_STYLE);
        grid.cells = this.setGridCells(grid.getContext(), PREVIEW_SIZE);

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
        let indexType = Math.floor(Math.random() * BLOCKS_TYPE.length);
        let center = 0;

        for (let cell of grid.cells) {
            if (cell.filled) {
                cell.resetCell();
            }
        }

        switch (BLOCKS_TYPE[indexType]) {
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

        block.setPositionSchema(PREVIEWGROUND_INDEX);
        block.setBlock(grid.cells, PREVIEWGROUND_INDEX);

        blockNumber += 1;
    };

    this.setBackground = function (bgcolor) {
        grid.setStyle(grid.getContext(), { background: bgcolor });

        for (let cell of grid.cells) {
            cell.setDefaultColor(bgcolor);
        }
    }

    init();
};

Preview.prototype.build = buildDOMElem;
Preview.prototype.setGridCells = function (element, size) {
    let cells = [];

    for (let i = 0; i < size; i++) {
        let cell = new Cell(i);
        let row = i >= PREVIEWGROUND_INDEX ? Math.floor(i / PREVIEWGROUND_INDEX) : 0;

        cell.setRow(row);
        cells.push(cell);
        element.append(cell.getElem());
    }
    return cells;
};

export default Preview;