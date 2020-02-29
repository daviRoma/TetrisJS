import { setClass, buildDOMElem } from './utils.js';

const titleClass = 'option-title';

let Options = function(id, text, classes) {
    let title;
    let context;

    let init = (function() {
        this.fieldId = id;
        context = this.build('div', {id: this.fieldId});
        title = this.build('p', {textContent: text});

        this.setClass(title, [titleClass]);
        context.append(title);
    }).bind(this);

    this.attach = function(parentElement){
        parentElement.append(context);
    };

    this.detach = function(){
        context.parentElement.removeChild(context);
    };

    this.setItems = function(optionItems) {
        for (let item of optionItems) {
            item.attach(context);
        }
    }

    init();

}

let OptionItem = function(type, name, value, check, classes) {
    let input;
    let label;
    let newLine;

    let init = (function() {
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

    this.attach = function(parentElement){
        parentElement.append(input);
        parentElement.append(label);
        parentElement.append(newLine);
    };

    this.detach = function(){
        input.parentElement.removeChild(input);
        label.parentElement.removeChild(label);
        newLine.parentElement.removeChild(input);
    };

    init();
};

Options.prototype.build = buildDOMElem;
Options.prototype.setClass = setClass;
OptionItem.prototype.build = buildDOMElem;
OptionItem.prototype.setClass = setClass;

export { Options, OptionItem };