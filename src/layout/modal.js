import { setClass, buildDOMElem } from '../utils.js';

let Modal = function (id, title, message_body) {
    let context;
    let container;

    let init = (function() {
        this.fieldId = id;
        
        context = this.build('div', { id: 'modal_window', name: 'modalWindow'});
        this.setClass(context, ["modal"]);

        container = new ModalContent('modal_content', title, message_body);
        context.append(container.getRoot());
        
    }).bind(this);

    this.attach = function(parentElement){
        parentElement.append(context);
    };

    this.detach = function () {
        context.parentElement.removeChild(context);
    }

    init();
}

let ModalContent = function (id, title, message_body) {
    let context;
    let close_button;
    let header;
    let body;
    let footer;

    let init = (function () {
        this.fieldId = id;
        this.title = title;
        this.message = message_body;

        context = this.build('div', { id: this.fieldId, name: 'modalContent' });
        this.setClass(context, ["modal-content"]);

        close_button = this.build('span', { id: 'close_button', name: 'close' });
        close_button.innerHTML = 'x';
        this.setClass(close_button, ["close"]);

        header = new ModalHeader('modal_header', title);
        body = new ModalBody('modal_body', message_body);
        footer = null;

        context.append(close_button);
        context.append(header.getRoot());
        context.append(body.getRoot());

        // Remove modal from the dom
        close_button.addEventListener('click', () => context.parentNode.remove());

    }).bind(this);

    this.getRoot = function () {
        return context;
    }

    init();
}

/**
 * Modal header class.
 * @param {String} id 
 * @param {String} title 
 */
let ModalHeader = function (id, title) {
    let context;
    let content;

    let init = (function() {
        this.fieldId = id;

        context = this.build('div', {id: this.fieldId});
        this.setClass(context, ["modal-header"]);

        content = this.build('p', { id: 'message_body', name: 'messageBody' });
        content.innerHTML = title;
        this.setClass(content, ["modal-header-text"]);
        context.append(content);

    }).bind(this);

    this.getRoot = function() {
        return context;
    }

    init();
}

/**
 * Modal body class.
 * @param {String} id 
 * @param {String} message 
 */
let ModalBody = function (id, message) {
    let context;
    let content;

    let init = (function () {
        this.fieldId = id;

        context = this.build('div', { id: this.fieldId });
        content = this.build('span', { id: 'modal_header_content', name: 'contentHeader'});
        content.innerHTML = message;
        context.append(content);

    }).bind(this);

    this.getRoot = function () {
        return context;
    }

    init();

}

/**
 * Modal footer class.
 * @param {String} id 
 */
let ModalFooter = function (id) {
    let context;
    let content;

    let init = (function () {
        this.fieldId = id;

        context = this.build('div', { id: this.fieldId });
        content = this.build('span', { id: 'modal_footer_content', name: 'contentFooter'});
        context.append(content);

    }).bind(this);

    this.getRoot = function () {
        return context;
    }

    init();

}

ModalContent.prototype.build = buildDOMElem;
ModalContent.prototype.setClass = setClass;

ModalHeader.prototype.build = buildDOMElem;
ModalHeader.prototype.setClass = setClass;

ModalBody.prototype.build = buildDOMElem;
ModalBody.prototype.setClass = setClass;

ModalFooter.prototype.build = buildDOMElem;
ModalFooter.prototype.setClass = setClass;

Modal.prototype.build = buildDOMElem;
Modal.prototype.setClass = setClass;

export default Modal;