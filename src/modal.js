import { setStyle, buildDOMElem } from './utils.js';
import $ from 'jquery';

let Modal = function(id, title, message) {
    let context;
    let header;
    let container;
    let body;
    let close;
    let _this = this;

    let init = (function() {
        this.fieldId = id;
        this.title = title;
        this.message = message;
        
        context = this.build('div', 'modal_window', 'modalWindow', 'modal');
        container = this.build('div', 'modal_content', 'modalContent', 'modal-content');
        header = this.build('span', 'content_header', 'contentHeader', 'modal-header-text');
        body = this.build('p', 'message_body', 'messageBody', '');
        close = this.build('span', 'close_button', 'close', 'close');

        context.append(container);
        container.append(close);
        container.append(header);
        container.append(body);

        $(close).text('x');
        $(close).click(() => $(context).remove());
        $(header).text(title);
        $(body).text(message);
        
    }).bind(this);

    this.attach = function(parentElement){
        parentElement.append(context);
    };

    init();

}

Modal.prototype.build = buildDOMElem;

export default Modal;