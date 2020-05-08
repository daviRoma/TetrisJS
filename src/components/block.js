/**
 * Block component.
 * 
 * Definitions of all block types.
 * 
 */

import { POSITIONS, BLOCK_SCHEMA, COLORS} from '../resources/configuration';


/**
 * Class Block.
 */
let Block = function(id, position, center) {
    this.id = id;
    this.center = center;
    this.position = position;
    this.positionSchema = { ...BLOCK_SCHEMA };
    this.colorIndex = Math.floor(Math.random() * COLORS.length);

    this.setNextPosition = function() {
        let positionIndex = POSITIONS.indexOf(this.position);
        this.position = positionIndex == 3 ? POSITIONS[0] : POSITIONS[positionIndex+1];
    };

    this.setBlock = function(cells, x) {
        for (let index in this.positionSchema) {
            cells[this.positionSchema[index]].setBackground(COLORS[this.colorIndex]);
        }
    };

    this.cleanBlocks = function(cells, schema) {
        for (let key in schema) {
            cells[schema[key]].resetCell();
        }
    };

    this.resetPositionSchema = function() {
        this.positionSchema.head = 0;
        this.positionSchema.body = 0;
        this.positionSchema.footer = 0;
        this.positionSchema.center = 0;
    }
    
};


/**
 * Class for Block type L.
 */
let LBlock = function(id, position, center) {
    
    Block.call(this, id, position, center);

    this.setPositionSchema = function(x) {

        switch (this.position) {
            case 'UP':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center-x;
                this.positionSchema.body = this.center+x;
                this.positionSchema.footer = this.center+x+1;
                break;

            case 'RIGHT':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center-1;
                this.positionSchema.body = this.center+1;
                this.positionSchema.footer = this.center-(x-1);
                break;
                
            case 'BOTTOM':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center-x;
                this.positionSchema.body = this.center+x;
                this.positionSchema.footer = this.center-(x+1);
                break;

            case 'LEFT':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center-1;
                this.positionSchema.body = this.center+1;
                this.positionSchema.footer = this.center+(x-1);
                break;

            default:
                break;
        }
    }
};

/**
 * Class for Block type Z.
 */
let ZBlock = function(id, position, center) {
    
    Block.call(this, id, position, center);

    this.setPositionSchema = function(x) {
        if (this.position == 'UP' || this.position == 'BOTTOM') {
            this.positionSchema.center = this.center;
            this.positionSchema.head = this.center-(x-1);
            this.positionSchema.body = this.center+1;
            this.positionSchema.footer = this.center+x;
        }

        if (this.position == 'LEFT' || this.position == 'RIGHT') {
            this.positionSchema.center = this.center;
            this.positionSchema.head = this.center-(x+1);
            this.positionSchema.body = this.center-x;
            this.positionSchema.footer = this.center+1;
        }
    }
    
}

/**
 * Class for Block type S.
 */
let SBlock = function(id, position, center) {
    
    Block.call(this, id, position, center);

    this.setPositionSchema = function(x) {
        if (this.position == 'UP' || this.position == 'BOTTOM') {
            this.positionSchema.center = this.center;
            this.positionSchema.head = this.center+(x+1);
            this.positionSchema.body = this.center+1;
            this.positionSchema.footer = this.center-x;
        }

        if (this.position == 'LEFT' || this.position == 'RIGHT') {
            this.positionSchema.center = this.center;
            this.positionSchema.head = this.center-(x-1);
            this.positionSchema.body = this.center-x;
            this.positionSchema.footer = this.center-1;
        }
    }
    
}

/**
 * Class for Block type Q (Square)
 */
let QBlock = function(id, position, center) {
    
    Block.call(this, id, position, center);

    this.setPositionSchema = function(x) {
        this.positionSchema.center = this.center;
        this.positionSchema.head = this.center-x;
        this.positionSchema.body = this.center+1;
        this.positionSchema.footer = this.center-(x-1);
    }
    
}

/**
 * Class for Block type T.
 */
let TBlock = function(id, position, center) {
    
    Block.call(this, id, position, center);

    this.setPositionSchema = function(x) {

        switch (this.position) {
            case 'UP':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center-1;
                this.positionSchema.body = this.center-x;
                this.positionSchema.footer = this.center+1;
                break;

            case 'RIGHT':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center-x;
                this.positionSchema.body = this.center+1;
                this.positionSchema.footer = this.center+x;
                break;
                
            case 'BOTTOM':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center+1;
                this.positionSchema.body = this.center+x;
                this.positionSchema.footer = this.center-1;
                break;

            case 'LEFT':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center+x;
                this.positionSchema.body = this.center-1;
                this.positionSchema.footer = this.center-x;
                break;

            default:
                break;
        }
    }

}

/**
 * Class for Block type I.
 */
let IBlock = function(id, position, center) {
    
    Block.call(this, id, position, center);

    this.setPositionSchema = function(x) {

        if (this.position == 'UP' || this.position == 'BOTTOM') {
            this.positionSchema.center = this.center;
            this.positionSchema.head = this.center-x;
            this.positionSchema.body = this.center+x;
            this.positionSchema.footer = this.center+(x*2);
        }

        if (this.position == 'LEFT' || this.position == 'RIGHT') {
            this.positionSchema.center = this.center;
            this.positionSchema.head = this.center+1;
            this.positionSchema.body = this.center-1;
            this.positionSchema.footer = this.center-2;
        }

    }
}

/**
 * Class for Block type J.
 */
let JBlock = function(id, position, center) {
    
    Block.call(this, id, position, center);

    this.setPositionSchema = function(x) {

        switch (this.position) {
            case 'UP':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center-x;
                this.positionSchema.body = this.center+x;
                this.positionSchema.footer = this.center+(x-1);
                break;

            case 'RIGHT':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center+1;
                this.positionSchema.body = this.center-1;
                this.positionSchema.footer = this.center-(x+1);
                break;
                
            case 'BOTTOM':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center+x;
                this.positionSchema.body = this.center-x;
                this.positionSchema.footer = this.center-(x-1);
                break;

            case 'LEFT':
                this.positionSchema.center = this.center;
                this.positionSchema.head = this.center-1;
                this.positionSchema.body = this.center+1;
                this.positionSchema.footer = this.center+x+1;
                break;

            default:
                break;
        }
    }

}


export { 
    Block,
    LBlock,
    ZBlock,
    SBlock,
    JBlock,
    TBlock,
    QBlock,
    IBlock
};