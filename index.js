import { $, jQuery } from 'jquery';

window.$ = $;
window.jQuery = jQuery;

export var Supported = function (target, cssCommands) {
    var self = this;
    self.target = target;
    self.cssCommands = cssCommands;
    self.placeholderId = "cssborder-";
    self.domParser = new DOMParser();
    self.targetDom = self.getTargetDom();
    self.css;
}

Supported.prototype.init = function () {
    var self = this;
    self.get();
}

Supported.prototype.getTargetDom = function () {
    var self = this;
    const xhr = new XMLHttpRequest();
    xhr.open("get", self.target);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState) {
            console.log(xhr.responseText);
        }
    }
};

// const runner = new Supported("http://localhost/adobe-plugin-ref.html", "http://localhost/style.css");