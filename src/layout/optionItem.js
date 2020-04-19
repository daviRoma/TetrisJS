import { setClass, buildDOMElem } from '../utils.js';

let OptionItem = function (type, name, value, check, classes) {
    let input;
    let label;
    let newLine;

    let init = (function () {
        this.fieldId = name;

        input = this.build('input', {
            id: value,
            type: type,
            name: name,
            value: value
        });

        if (check) {
            input.checked = true;
        }

        label = this.build('label', {
            for: value,
            textContent: value.charAt(0).toUpperCase() + value.substring(1)
        });

        newLine = this.build('br', {});

        if (classes) {
            this.setClass(input, classes);
        }

    }).bind(this);

    this.attach = function (parentElement) {
        parentElement.append(input);
        parentElement.append(label);
        parentElement.append(newLine);
    };

    this.detach = function () {
        input.parentElement.removeChild(input);
        label.parentElement.removeChild(label);
        newLine.parentElement.removeChild(input);
    };

    init();
};

OptionItem.prototype.build = buildDOMElem;
OptionItem.prototype.setClass = setClass;

export default OptionItem;