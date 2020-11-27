/**
 * Grid component.
 * 
 */

import { setStyle, buildDOMElem } from '../resources/utils';

/**
 * Grid class
 * @param {String} name 
 * @param {Number} size
 * @param {Object} style 
 */

const Grid = function(id, name, size, style) {
    let context;
    let _this = this;
    
    let init = (function () {
        this.fieldId = id;
        this.size = size;
        this.cells = [];
        this.style = style;

        context = this.build('div', { id: this.fieldId, name: name });
        this.setStyle(context, this.style);
    }).bind(this);

    this.setContext = function(context) {
        context = context;
    }

    this.getContext = function() {
        return context;
    }

    this.getStyle = function() {
        return this.style;
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

export default Grid;