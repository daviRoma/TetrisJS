import { setClass, buildDOMElem, scoreCalculation } from '../utils.js';

let Score = function (id) {
    let context;
    let text_elem;
    let num_elem;
    let value = 0;

    let init = (function () {
        this.fieldId = id;

        context = this.build('div', { id: this.fieldId, name: 'score_container' });
        this.setClass(context, ["score-container"]);

        text_elem = this.build('span', { id: 'score_text' });
        this.setClass(text_elem, ["score-text"]);
        text_elem.innerHTML = 'Score';

        num_elem = this.build('span', { id: 'score_number' });
        this.setClass(num_elem, ["score-number"]);
        num_elem.innerHTML = value;

        context.append(text_elem);
        context.append(num_elem);

    }).bind(this);

    this.attach = function (parentElement) {
        parentElement.append(context);
    };

    this.detach = function () {
        context.parentElement.removeChild(context);
    }
    
    this.setScore = function(score) {
        num_elem.innerHTML = score;
        value = score;
    }

    this.getScore = function() {
        return value;
    }

    init();
}

Score.prototype.build = buildDOMElem;
Score.prototype.setClass = setClass;
Score.prototype.calculateNewScore = scoreCalculation;

export default Score;