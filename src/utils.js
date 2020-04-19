/**
 * Utility class.
 * 
 */

const bgcolors = {
    default: 'white',
    darkblue: 'darkblue',
    darkgreen: '#004d00',
    darkred: '#800000',
    black: '#0d0d0d',
    violet: '#660066'
};

/**
 * Set element style.
 * @param {any} element 
 * @param {Object} styles 
 */
let setStyle = function(element, styles) {
    for (let property in styles) {
        element.style[property] = styles[property];
    }
};

/**
 * Set element class list.
 * @param {any} element 
 * @param {Object} classes 
 */
let setClass = function (element, classes) {
    for (let cls of classes) {
        element.classList.add(cls);
    }
};

/**
 * Build document element.
 * @param {String} dom_name 
 * @param {Object} elem_schema 
 */
let buildDOMElem = function(dom_name, elem_schema) {
    let element = document.createElement(dom_name);
    for (let key in elem_schema) {
        element[key] = elem_schema[key];
    }
    return element;
};

let scoreCalculation = function(score, rows) {
    score += (10*rows);
    return score;
};


export {
    bgcolors,
    setStyle,
    setClass,
    buildDOMElem,
    scoreCalculation
};