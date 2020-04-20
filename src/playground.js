import { setStyle, buildDOMElem } from './utils.js';
import { grid, grid_style } from './components/grid.js';
import { IBlock } from './components/block.js';

const default_center = 14;

/** 
 * Playground class.
 * @param {String} id
 */
let Playground = function(id) {
    let div;
    let playGrid;
    let size = 200;
    let cells = [];
    let currentBlock;
    let winning_rows;
    let _this = this;

    let init = (function() {
        this.fieldId = id;
        
        div = this.build('div', { id: this.fieldId, name: 'playground_grid'});

        // Grid size: 20x10
        this.buildGrid();
        this.setStyle(div, playGrid);
        cells = this.setGrid(div, size);
    }).bind(this);

    this.getWinningRows = function () {
        return winning_rows;
    }

    this.buildGrid = function() {
        playGrid = {...grid_style};
        playGrid.top = '15%';
        playGrid.left = '40%';
        playGrid.height = '440px';
        playGrid.width = '220px';
    }

    this.cleanGrid = function() {
        div.querySelectorAll('div').forEach(function (elem) {
            elem.remove();
        });
        cells = this.setGrid(div, size);
        winning_rows = 0;
    }

    this.setBackground = function(bgcolor) {
        playGrid.background = bgcolor;
        this.setStyle(div, playGrid);

        for (let cell of cells) {
            cell.setDefaultColor(bgcolor);
        }
    }

    this.attach = function(parentElement){
        parentElement.append(div);
    }
  
    this.detach = function(){
        div.parentElement.removeChild(div);
    }
  
    this.handleEvent = function(eventType, callback){
        div.addEventListener(eventType, callback.bind(this, _this));
    }

    /**
     * Place block at the top center.
     */
    this.placeBlockToDefaultPosition = function(block) {
        currentBlock = block;
        currentBlock.resetPositionSchema();
        currentBlock.setCenter(default_center);
        currentBlock.setPositionSchema(10);
        currentBlock.setBlock(cells, 10);

        // Check looser case
        if (cells[default_center].fixed || 
            cells[currentBlock.positionSchema.body].fixed ||
            cells[currentBlock.positionSchema.head].fixed ||
            cells[currentBlock.positionSchema.footer].fixed) 
        {
            return false;
        }
        return true;
    };

    /**
     * Scroll block on the grid.
     */
    this.scrollBlock = function(param) {
        currentBlock.cleanBlocks(cells, currentBlock.positionSchema);
        currentBlock.setCenter(currentBlock.center + (param));
        currentBlock.setPositionSchema(10);
        currentBlock.setBlock(cells, 10);
    }

    /**
     * Round block on the grid.
     */
    this.roundBlock = function() {
        let schema = {...currentBlock.positionSchema};
        let center = currentBlock.getCenter();
        let position = currentBlock.getPosition();

        // left limit
        for (let i = 0; i < 200; i+=10) {
            if (center == i) {
                if (currentBlock instanceof IBlock) {
                    currentBlock.center+=2;
                } else {
                    currentBlock.center+=1;
                }
            }
        }

        // right limit
        for (let i = 9; i < 200; i+=10) {
            if (center == i) {
                if (currentBlock instanceof IBlock) {
                    currentBlock.center-=2;
                } else {
                    currentBlock.center-=1;
                }
            }
        }

        // Round the block
        currentBlock.setNextPosition();
        currentBlock.setPositionSchema(10);

        // Check new position available
        for (let pos in currentBlock.positionSchema) {
            if (cells[currentBlock.positionSchema[pos]].fixed) {
                // New position not available, position restore
                currentBlock.setCenter(center);
                currentBlock.positionSchema = schema;
                currentBlock.setPosition(position);
                return;
            }
        }

        // Set new position
        currentBlock.cleanBlocks(cells, schema);
        currentBlock.setBlock(cells, 10);
    }

    /** 
     * Check wall left and right limit.
     */
    this.checkWallLimit = function(limit) {
        // Check wall left or right
        for (let i = limit; i < 200; i+=10) {

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
     */
    this.checkBlockSideLimit = function(param) {
        for (let pos in currentBlock.positionSchema) {
            let val = currentBlock.positionSchema[pos];

            if (cells[val+(param)].fixed) {
                return false;
            }
        }
        return true;
    }

    /**
     * Attach and fix the block.
     */
    this.attachBlock = function(param) {
        for (let pos in currentBlock.positionSchema) {
            if (cells[currentBlock.positionSchema[pos] + param].fixed) {
                return true;
            }    
        }
        return false;
    };

    this.setFixedBlock = function() {
        for (let pos in currentBlock.positionSchema) {
            cells[currentBlock.positionSchema[pos]].setFixed(true);
        }
    };

    /**
     * Check winner rows from bottom and up to the fourth cell (if exists)
     */
    this.checkRowWin = function() {
        let max = Math.max(currentBlock.positionSchema.center, currentBlock.positionSchema.head, currentBlock.positionSchema.body, currentBlock.positionSchema.footer);
        let arrayWin = [];
        let row = cells[max].row;
        let iteration = 0;

        while (row > 0 && iteration < 4) {
            let count = 0;
            let index = row >= 10 ? row*10 : row;
            let endline = index+10;
            
            for (index; index < endline; index++) {
                count = cells[index].fixed ? count+1 : count;
            }

            if (count == 10) arrayWin.push(row);
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

    // Block reposition after win case
    this.blockReposition = function(arrayWin) {
        let arrayLength = arrayWin.length;

        for (let i of arrayWin) {
            let effectiveIndex = i*10;
            for (let j = effectiveIndex; j < effectiveIndex+10; j++) {
                cells[j].resetCell();
            }
        }
        
        // Scroll blocks
        for (let i = 0; i < arrayLength; i++) {
            let lastIndex = arrayWin.pop()*10;

            while (lastIndex > 0) {
                let k = lastIndex - 10;
                let z = lastIndex + 10;
    
                for (let j = lastIndex; j < z; j++) {
                    if (cells[k].filled) {
                        cells[j].setBackground(cells[k].color);
                        cells[j].setFixed(true);
                        cells[k].resetCell();
                    }
                    k++;
                }
                lastIndex-=10;
            }
        }
    };

    init();
};

Playground.prototype.setStyle = setStyle;
Playground.prototype.setGrid = grid;
Playground.prototype.build = buildDOMElem;

export default Playground;


