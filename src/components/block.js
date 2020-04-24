/**
 * Class Block.
 * 
 */

const positionList = ['UP', 'RIGHT', 'BOTTOM', 'LEFT'];
const type = ['L', 'J', 'I', 'T', 'Q', 'Z', 'S'];

// blue, red, green, orange, yellow, purple, pink, grey, brown
const colors = [
    '#0044cc', 
    '#cc0000', 
    '#009933', 
    '#e65c00', 
    '#e6e600', 
    '#9933ff', 
    '#ff4dff', 
    '#808080', 
    '#996633'
];

const schema = { center: 0, head: 0, body: 0, footer: 0 };

/**
 * Class Block
 */
let Block = function(id, position, center) {
    this.id = id;
    this.center = center;
    this.position = position;
    this.positionSchema = {...schema};
    this.colorIndex = Math.floor(Math.random() * colors.length);

    this.setNextPosition = function() {
        let positionIndex = positionList.indexOf(this.position);
        this.position = positionIndex == 3 ? positionList[0] : positionList[positionIndex+1];
    };

    this.setBlock = function(cells, x) {
        for (let index in this.positionSchema) {
            cells[this.positionSchema[index]].setBackground(colors[this.colorIndex]);
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
    IBlock,
    positionList,
    type
};