import { setStyle, setClass, buildDOMElem } from '../utils.js';

/**
 * Cell
 * @param {String} id 
 */
let Cell = function(id) {
    let div;

    let init = (function() {
        this.fieldId = id;
        this.filled = false;
        this.fixed = false;
        this.color = null;
        this.defaultColor = 'white';
        this.row = 0;

        div = this.build('div', {id: 'Cell-' + id, name:'cell'});
        this.setClass(div, ['cell']);
        
    }).bind(this);
    
    this.attach = function(parentElement){
        parentElement.append(div);
    };
    
    this.detach = function () {
        div.parentElement.removeChild(div);
    }
    
    this.setRow = function(row) {
        this.row = row;
    }

    this.setBackground = function(color) {
        this.setStyle(div, {background: color});
        this.color = color;
        this.filled = true;
    }

    this.setDefaultColor = function(bgcolor) {
        this.defaultColor = bgcolor;
        if (bgcolor == 'white') {
            this.setStyle(div, {
                border: "1px solid black",
                background: this.color
            });
        } else {
            this.setStyle(div, {
                border: '1px solid '+bgcolor,
                background: this.color
            });
        }
    }

    this.resetCell = function() {
        this.setStyle(div, {background: this.defaultColor});
        this.filled = false;
        this.fixed = false;
        this.color = null;
    }

    this.setFixed = function(fixed) {
        this.fixed = fixed;
    }

    this.getElem = function() {
        return div;
    };

    init();
};

Cell.prototype.setStyle = setStyle;
Cell.prototype.setClass = setClass;
Cell.prototype.build = buildDOMElem;

export default Cell;