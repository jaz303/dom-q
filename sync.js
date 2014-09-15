var du = require('domutil');
var style = du.style;
var removeStyle = du.removeStyle;
var addClass = du.addClass;
var removeClass = du.removeClass;
var toggleClass = du.toggleClass;
var removeMatchingClasses = du.removeMatchingClasses;
var append = du.append;
var clear = du.clear;
var content = du.content;
var text = du.text;

module.exports = Queue;
function Queue() {
}

Queue.prototype.afterFlush = function(cb) { cb(); };

Queue.prototype.setAttribute = function(el, attr, value) {
    el.setAttribute(attr, value);
}

Queue.prototype.removeAttribute = function(el, attr) {
    el.removeAttribute(attr);
}

Queue.prototype.style = function(el, attribute, value) {
    style(el, attribute, value);
}

Queue.prototype.removeStyle = function(el, attribute) {
    removeStyle(el, attribute);
}

Queue.prototype.addClass = function(el, classes) {
    addClass(el, classes);
}

Queue.prototype.removeClass = function(el, classes) {
    removeClass(el, classes);
}

Queue.prototype.toggleClass = function(el, classes) {
    toggleClass(el, classes);
}

Queue.prototype.removeMatchingClasses = function(el, regexp) {
    removeMatchingClasses(el, regexp);
}

Queue.prototype.appendChild = function(el, newChild) {
    el.appendChild(newChild);
}

Queue.prototype.insertBefore = function(parentElement, newElement, referenceElement) {
    parentElement.insertBefore(newElement, referenceElement);
}

Queue.prototype.insertAfter = function(parentElement, newElement, referenceElement) {
    parentElement.insertBefore(newElement, referenceElement.nextSibling);
}

Queue.prototype.removeChild = function(el, childElement) {
    el.removeChild(childElement);
}

Queue.prototype.replaceChild = function(parentNode, newChild, oldChild) {
    parentNode.replaceChild(newChild, oldChild);
}

Queue.prototype.before = function(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

Queue.prototype.after = function(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

Queue.prototype.replace = function(oldNode, newNode) {
    oldNode.parentNode.replaceChild(newNode, oldNode);
}

Queue.prototype.remove = function(el) {
    el.parentNode.removeChild(el);
}

Queue.prototype.append = function(el, content) {
    append(el, content);
}

Queue.prototype.clear = function(el) {
    clear(el);
}

Queue.prototype.content = function(el, htmlLike) {
    content(el, htmlLike);
}

Queue.prototype.text = function(el, txt) {
    text(el, txt);
}

Queue.prototype.call = function(fn) {
    fn();
}

