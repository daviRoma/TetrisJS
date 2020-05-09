import { buildDOMElem } from '../resources/utils';
import Grid from '../components/grid';
import { IBlock } from '../components/block';
import Cell from '../components/cell';
import { PLAYGROUND_STYLE, DEFAULT_CENTER, PLAYGROUND_SIZE, PLAYGROUND_INDEX } from '../resources/configuration';


/** 
 * Playground controller class.
 * @param {String} id
 */
let Playground = function(id) {
    let grid;
    let currentBlock;
    let winning_rows;

    let init = (function() {
        this.fieldId = id;

        grid = new Grid('playground_grid', 'playground_grid', PLAYGROUND_SIZE, PLAYGROUND_STYLE);
        grid.cells = this.setGridCells(grid.getContext(), PLAYGROUND_SIZE);

    }).bind(this);

    this.setGrid = function(grid) {
        grid = grid;
    }

    this.getGrid = function() {
        return grid;
    }

    this.getWinningRows = function () {
        return winning_rows;
    }

    this.attach = function(parentElement){
        grid.attach(parentElement);
    }
  
    this.detach = function() {
        grid.detach();
    }
  
    this.handleEvent = function(eventType, callback) {
        grid.handleEvent(eventType, callback);
    }

    this.cleanGrid = function () {
        grid.getContext().querySelectorAll('div').forEach(function (elem) {
            elem.remove();
        });
        grid.cells = this.setGridCells(grid.getContext(), PLAYGROUND_SIZE);
        winning_rows = 0;
    }

    this.setBackground = function (bgcolor) {
        grid.setStyle(grid.getContext(), { background: bgcolor });

        for (let cell of grid.cells) {
            cell.setDefaultColor(bgcolor);
        }
    }

    /**
     * Place block at the top center.
     * @param {Objects} block
     */
    this.placeBlockToDefaultPosition = function(block) {
        currentBlock = block;
        currentBlock.resetPositionSchema();
        currentBlock.center = currentBlock instanceof IBlock ? DEFAULT_CENTER - 9 : DEFAULT_CENTER;
        currentBlock.setPositionSchema(PLAYGROUND_INDEX);
        currentBlock.setBlock(grid.cells, PLAYGROUND_INDEX);

        // Check looser case
        if (grid.cells[DEFAULT_CENTER].fixed || 
            grid.cells[currentBlock.positionSchema.body].fixed ||
            grid.cells[currentBlock.positionSchema.head].fixed ||
            grid.cells[currentBlock.positionSchema.footer].fixed) 
        {
            return false;
        }
        return true;
    };

    /**
     * Scroll block on the grid.
     * @param {Number} param
     */
    this.scrollBlock = function(param) {
        currentBlock.cleanBlocks(grid.cells, currentBlock.positionSchema);
        currentBlock.center = currentBlock.center + (param);
        currentBlock.setPositionSchema(PLAYGROUND_INDEX);
        currentBlock.setBlock(grid.cells, PLAYGROUND_INDEX);
    }

    /**
     * Round block on the grid.
     */
    this.roundBlock = function() {
        let schema = {...currentBlock.positionSchema};
        let center = currentBlock.center;
        let position = currentBlock.position;

        // if current block is an IBlock at the start position, do nothing
        if (currentBlock instanceof IBlock && center < PLAYGROUND_INDEX) {
            return;
        }
        
        // left limit
        for (let i = 0; i < 200; i+=PLAYGROUND_INDEX) {
            if (center == i) {
                if (currentBlock instanceof IBlock) {
                    currentBlock.center+=2;
                } else {
                    currentBlock.center+=1;
                }
            }
        }

        // right limit
        for (let i = 9; i < 200; i+=PLAYGROUND_INDEX) {
            if (center == i) {
                if (currentBlock instanceof IBlock) {
                    currentBlock.center-=2;
                } else {
                    currentBlock.center-=1;
                }
            }
        }

        // Round the block (Virtual)
        currentBlock.setNextPosition();
        currentBlock.setPositionSchema(PLAYGROUND_INDEX);

        // Check new position available
        for (let pos in currentBlock.positionSchema) {
            if (grid.cells[currentBlock.positionSchema[pos]].fixed) {
                // New position not available, position restore
                currentBlock.center = center;
                currentBlock.positionSchema = schema;
                currentBlock.setPosition(position);
                return;
            }
        }

        // Set new position
        currentBlock.cleanBlocks(grid.cells, schema);
        currentBlock.setBlock(grid.cells, PLAYGROUND_INDEX);
    }

    /** 
     * Check wall left and right limit.
     * @param {Number} limit
     */
    this.checkWallLimit = function(limit) {
        // Check wall left or right
        for (let i = limit; i < PLAYGROUND_SIZE; i+=PLAYGROUND_INDEX) {

            // wall
            if (currentBlock.positionSchema.center == i || 
                currentBlock.positionSchema.body == i ||
                currentBlock.positionSchema.head == i ||
                currentBlock.positionSchema.footer == i) 
            {
                return false;
            }
        }
        return true;
    }

    /**
     * Check ground limit.
     */
    this.checkGroundLimit = function() {
        let ground = 190;
        // Check wall left or right
        for (let i = ground; i < 200; i++) {

            // left wall
            if (currentBlock.positionSchema.center == i || 
                currentBlock.positionSchema.body == i ||
                currentBlock.positionSchema.head == i ||
                currentBlock.positionSchema.footer == i) 
            {
                return false;
            }
        }
        return true;
    };

    /**
     * Check limit left and right.
     * @param {Number} param
     */
    this.checkBlockSideLimit = function(param) {
        for (let pos in currentBlock.positionSchema) {
            let val = currentBlock.positionSchema[pos];

            if (grid.cells[val+(param)].fixed) {
                return false;
            }
        }
        return true;
    }

    /**
     * Attach and fix the block.
     * @param {Number} param
     */
    this.attachBlock = function(param) {
        for (let pos in currentBlock.positionSchema) {
            if (grid.cells[currentBlock.positionSchema[pos] + param].fixed) {
                return true;
            }    
        }
        return false;
    };

    /**
     * Set fixed attribute to true at each cell of the block to be fixed.
     */
    this.setFixedBlock = function() {
        for (let pos in currentBlock.positionSchema) {
            grid.cells[currentBlock.positionSchema[pos]].setFixed(true);
        }
    };

    /**
     * Check winner rows from bottom and up to the fourth cell (if exists)
     */
    this.checkRowWin = function() {
        let max = Math.max(currentBlock.positionSchema.center, currentBlock.positionSchema.head, currentBlock.positionSchema.body, currentBlock.positionSchema.footer);
        let arrayWin = [];
        let row = grid.cells[max].row;
        let iteration = 0;

        while (row > 0 && iteration < 4) {
            let count = 0;
            let index = row * PLAYGROUND_INDEX;
            let endline = index + PLAYGROUND_INDEX;
            
            for (index; index < endline; index++) {
                count = grid.cells[index].fixed ? count+1 : count;
            }

            if (count == PLAYGROUND_INDEX) arrayWin.push(row);
            row -= 1;
            iteration += 1;
        }

        // Filled row -> block reposition
        if (arrayWin.length > 0) {
            winning_rows = arrayWin.length;
            this.blockReposition(arrayWin);
            return true
        }
        winning_rows = 0;
        // Not row win
        return false;

    }

    /**
     * Block reposition after win case.
     * @param {Array} arrayWin
     */ 
    this.blockReposition = function(arrayWin) {
        let arrayLength = arrayWin.length;

        for (let i of arrayWin) {
            let effectiveIndex = i * PLAYGROUND_INDEX;
            for (let j = effectiveIndex; j < (effectiveIndex + PLAYGROUND_INDEX); j++) {
                grid.cells[j].resetCell();
            }
        }
        
        // Scroll blocks
        for (let i = 0; i < arrayLength; i++) {
            let lastIndex = arrayWin.pop()*PLAYGROUND_INDEX;

            while (lastIndex > 0) {
                let k = lastIndex - PLAYGROUND_INDEX;
                let z = lastIndex + PLAYGROUND_INDEX;
    
                for (let j = lastIndex; j < z; j++) {
                    if (grid.cells[k].filled) {
                        grid.cells[j].setBackground(grid.cells[k].color);
                        grid.cells[j].setFixed(true);
                        grid.cells[k].resetCell();
                    }
                    k++;
                }
                lastIndex-=PLAYGROUND_INDEX;
            }
        }
    };

    init();
};

Playground.prototype.build = buildDOMElem;
Playground.prototype.setGridCells = function (element, size) {
    let cells = [];

    for (let i = 0; i < size; i++) {
        let cell = new Cell(i);
        let row = i >= PLAYGROUND_INDEX ? Math.floor(i / PLAYGROUND_INDEX) : 0;

        cell.setRow(row);
        cells.push(cell);
        element.append(cell.getElem());
    }
    return cells;
};

export default Playground;