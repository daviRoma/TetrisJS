import { setStyle } from './utils.js';
import { ZBlock, SBlock, LBlock, JBlock, TBlock, QBlock, IBlock, type } from './block.js';
import { setGrid, grid } from './grid.js';

/** 
 * Block Preview square.
 * @param {String} id
 */
let BlockPreview = function(id) {
    let div;
    let previewGrid;
    let size = 25;
    let cells = [];
    let block;
    let blockNumber = 1;
    let _this = this;

    let init = (function() {
        this.fieldId = id;
        
        div = document.createElement('div');
        div.setAttribute('id', id);
        div.setAttribute('name', 'preview_grid');

        // Grid size: 20x10
        _this.buildGrid();
        this.setStyle(div, previewGrid);
        cells = _this.setGrid(div, size);
  
    }).bind(this);

    this.buildGrid = function() {
        previewGrid = {...grid};
        previewGrid.top = '15%';
        previewGrid.left = '65%';
        previewGrid.height = '110px';
        previewGrid.width = '110px';
    }

    this.attach = function(parentElement){
        parentElement.prepend(div);
    };
  
    this.detach = function(){
        div.parentElement.removeChild(div);
    };
  
    this.handleEvent = function(eventType, callback){
        div.addEventListener(eventType, callback.bind(this, _this));
    };

    this.resetGrid = function() {
        for (let cell of cells) {
            cell.resetCell();
        }
    };

    this.getBlock = function() {
        return block;
    };

    this.generateNextBlock = function() {
        let indexType = Math.floor(Math.random() * type.length);
        let center = 0;

        for (let cell of cells) {
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

        block.setBlock(cells, 5);
        blockNumber += 1;
    };

    init();
};

BlockPreview.prototype.setStyle = setStyle;
BlockPreview.prototype.setGrid = setGrid;

export default BlockPreview;