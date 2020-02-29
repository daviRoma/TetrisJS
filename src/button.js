import { setClass, buildDOMElem } from './utils.js';

const materialIcon = 'material-icons';

let Button = function(id, name, classes, iconName) {
    let context;
    let icon;
    let _this = this;

    let init = (function() {
        this.fieldId = id;
        this.active = false;

        context = this.build('button', {id: this.fieldId, textContent: name});
        this.setClass(context, classes);

        if (iconName != null) {
            icon = this.build('i', {textContent: iconName});
            this.setClass(icon, [materialIcon]);
            context.append(icon);
        }
        
    }).bind(this);

    this.attach = function(parentElement){
        this.active = true;
        parentElement.append(context);
    };

    this.detach = function(){
        this.active = false;
        context.parentElement.removeChild(context);
    }
  
    this.handleEvent = function(eventType, callback){
        context.addEventListener(eventType, callback.bind(this, _this));
    }

    this.unsetDisable = function(cls) {
        context.classList.remove(cls);
    }

    init();

}

Button.prototype.build = buildDOMElem;
Button.prototype.setClass = setClass;

export default Button;