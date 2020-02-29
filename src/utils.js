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

let setStyle = function(element, styles) {
    for (let property in styles) {
        element.style[property] = styles[property];
    }
};

let buildDOMElem = function(dom_name, elem_schema) {
    let element = document.createElement(dom_name);
    for (let key in elem_schema) {
        element[key] = elem_schema[key];
    }
    return element;
};

// let buildDOMElem = function(dom_name, elem_id, elem_name, elem_text) {
//     let element = document.createElement(dom_name);
//     if (elem_id) element.id = elem_id;
//     if (elem_name) element.name = elem_name;
//     if (elem_text) element.textContent = elem_text;
//     return element;
// };

let setClass = function(element, classes) {
    for (let cls of classes) {
        element.classList.add(cls);
    }
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