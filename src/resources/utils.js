/**
 * Utility class.
 */

/**
 * Set element style.
 * @param {any} element 
 * @param {Object} styles 
 */
const setStyle = function(element, styles) {
    for (let property in styles) {
        element.style[property] = styles[property];
    }
};

/**
 * Set element class list.
 * @param {any} element 
 * @param {Object} classes 
 */
const setClass = function (element, classes) {
    if (classes != null) {
        for (let cls of classes) {
            element.classList.add(cls);
        }
    }
};

/**
 * Build document element.
 * @param {String} dom_name 
 * @param {Object} elem_schema 
 */
const buildDOMElem = function(dom_name, elem_schema) {
    let element = document.createElement(dom_name);
    for (let key in elem_schema) {
        element[key] = elem_schema[key];
    }
    return element;
};

/**
 * Calculate new score.
 * @param {Number} score 
 * @param {Number} rows 
 */
const scoreCalculation = function(score, rows) {
    let bonus = 0;

    if (rows == 4) {
        bonus = 7;
    } else if (rows == 3) {
        bonus = 5;
    }

    score += (10*rows) + bonus;

    return score;
};


export {
    setStyle,
    setClass,
    buildDOMElem,
    scoreCalculation
};