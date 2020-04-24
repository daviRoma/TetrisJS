import { setStyle, buildDOMElem } from '../utils';

const grid_style = {
    margin: '5px',
    border: '2px solid black',
    background: 'white'
};

/**
 * Grid class
 * @param {String} name 
 * @param {Number} size
 * @param {Object} style 
 */

let Grid = function(id, name, size, style) {
    let context;
    let _this = this;
    
    let init = (function () {
        this.fieldId = id;
        this.size = size;
        this.cells = [];

        context = this.build('div', { id: this.fieldId, name: name });
        this.setStyle(context, style);
    }).bind(this);

    this.setContext = function(context) {
        context = context;
    }

    this.getContext = function() {
        return context;
    }

    this.attach = function (parentElement) {
        parentElement.append(context);
    }

    this.detach = function () {
        context.parentElement.removeChild(context);
    }

    this.handleEvent = function (eventType, callback) {
        context.addEventListener(eventType, callback.bind(this, _this));
    }

    init();
}

Grid.prototype.build = buildDOMElem;
Grid.prototype.setStyle = setStyle;

export { Grid, grid_style};