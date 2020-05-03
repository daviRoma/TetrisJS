import { setClass, buildDOMElem } from '../resources/utils';

let Options = function(id, text, classes) {
    let title;
    let context;

    let init = (function() {
        this.fieldId = id;
        context = this.build('div', {id: this.fieldId});
        title = this.build('p', {textContent: text});

        this.setClass(title, ['option-title']);
        context.append(title);
    }).bind(this);

    this.attach = function(parentElement){
        parentElement.append(context);
    };

    this.detach = function(){
        context.parentElement.removeChild(context);
    };

    this.setItems = function(items) {
        for (let item of items) {
            item.attach(context);
        }
    }

    init();

}

Options.prototype.build = buildDOMElem;
Options.prototype.setClass = setClass;

export default Options;