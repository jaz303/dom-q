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

var rafq = require('raf-q');

module.exports = Queue;
function Queue() {
    this._q = rafq(apply);
}

Queue.prototype.afterFlush = function(cb) { this._q.after(cb); };

var SET_ATTRIBUTE = 1;
var REMOVE_ATTRIBUTE = 2;
var SET_STYLE = 3;
var REMOVE_STYLE = 4;
var ADD_CLASS = 5;
var REMOVE_CLASS = 6;
var TOGGLE_CLASS = 7;
var REMOVE_MATCHING_CLASSES = 8;
var APPEND_CHILD = 9;
var INSERT_BEFORE = 10;
var INSERT_AFTER = 11;
var REMOVE_CHILD = 12;
var REPLACE_CHILD = 13;
var BEFORE = 14;
var AFTER = 15;
var REPLACE = 16;
var REMOVE = 17;
var APPEND = 18;
var CLEAR = 19;
var CONTENT = 20;
var SET_TEXT = 21;
var CALL = 22;

function apply(op) {
    switch(op[0]) {
        case SET_ATTRIBUTE:
            op[1].setAttribute(op[2], op[3]);
            break;
        case REMOVE_ATTRIBUTE:
            op[1].removeAttribute(op[2]);
            break;
        case SET_STYLE:
            style(op[1], op[2], op[3]);
            break;
        case REMOVE_STYLE:
            removeStyle(op[1], op[2]);
            break;
        case ADD_CLASS:
            addClass(op[1], op[2]);
            break;
        case REMOVE_CLASS:
            removeClass(op[1], op[2]);
            break;
        case TOGGLE_CLASS:
            toggleClass(op[1], op[2]);
            break;
        case REMOVE_MATCHING_CLASSES:
            removeMatchingClasses(op[1], op[2]);
            break;
        case APPEND_CHILD:
            op[1].appendChild(op[2]);
            break;
        case INSERT_BEFORE:
            op[1].insertBefore(op[2], op[3]);
            break;
        case INSERT_AFTER:
            op[1].insertBefore(op[2], op[3].nextSibling);
            break;
        case REMOVE_CHILD:
            op[1].removeChild(op[2]);
            break;
        case REPLACE_CHILD:
            op[1].replaceChild(op[2], op[3]);
            break;
        case BEFORE:
            op[1].parentNode.insertBefore(op[2], op[1]);
            break;
        case AFTER:
            op[1].parentNode.insertBefore(op[2], op[1].nextSibling);
            break;
        case REPLACE:
            op[1].parentNode.replaceChild(op[2], op[1]);
            break;
        case REMOVE:
            op[1].parentNode.removeChild(op[1]);
            break;
        case APPEND:
            append(op[1], op[2]);
            break;
        case CLEAR:
            clear(op[1]);
            break;
        case CONTENT:
            content(op[1], op[2]);
            break;
        case SET_TEXT:
            text(op[1], op[2]);
            break;
        case CALL:
            op[1]();
            break;
    }
}

Queue.prototype.setAttribute = function(el, attr, value) {
    this._q.push([SET_ATTRIBUTE, el, attr, value]);
}

Queue.prototype.removeAttribute = function(el, attr) {
    this._q.push([REMOVE_ATTRIBUTE, el, attr]);
}

Queue.prototype.style = function(el, attribute, value) {
    this._q.push([SET_STYLE, el, attribute, value]);
}

Queue.prototype.removeStyle = function(el, attribute) {
    this._q.push([REMOVE_STYLE, el, attribute]);
}

Queue.prototype.addClass = function(el, classes) {
    this._q.push([ADD_CLASS, el, classes]);
}

Queue.prototype.removeClass = function(el, classes) {
    this._q.push([REMOVE_CLASS, el, classes]);
}

Queue.prototype.toggleClass = function(el, classes) {
    this._q.push([TOGGLE_CLASS, el, classes]);
}

Queue.prototype.removeMatchingClasses = function(el, regexp) {
    this._q.push([REMOVE_MATCHING_CLASSES, el, regexp]);
}

Queue.prototype.appendChild = function(el, newChild) {
    this._q.push([APPEND_CHILD, el, newChild]);
}

Queue.prototype.insertBefore = function(parentElement, newElement, referenceElement) {
    this._q.push([INSERT_BEFORE, parentElement, newElement, referenceElement]);
}

Queue.prototype.insertAfter = function(parentElement, newElement, referenceElement) {
    this._q.push([INSERT_AFTER, parentElement, newElement, referenceElement]);
}

Queue.prototype.removeChild = function(el, childElement) {
    this._q.push([REMOVE_CHILD, el, childElement]);
}

Queue.prototype.replaceChild = function(parentNode, newChild, oldChild) {
    this._q.push([REPLACE_CHILD, parentNode, newChild, oldChild]);
}

Queue.prototype.before = function(referenceNode, newNode) {
    this._q.push([BEFORE, referenceNode, newNode]);
}

Queue.prototype.after = function(referenceNode, newNode) {
    this._q.push([AFTER, referenceNode, newNode]);
}

Queue.prototype.replace = function(oldNode, newNode) {
    this._q.push([REPLACE, oldNode, newNode]);
}

Queue.prototype.remove = function(el) {
    this._q.push([REMOVE, el]);
}

Queue.prototype.append = function(el, content) {
    this._q.push([APPEND, el, content]);
}

Queue.prototype.clear = function(el) {
    this._q.push([CLEAR, el]);
}

Queue.prototype.content = function(el, htmlLike) {
    this._q.push([CONTENT, el, htmlLike]);
}

Queue.prototype.text = function(el, txt) {
    this._q.push([SET_TEXT, el, txt]);
}

Queue.prototype.call = function(fn) {
    this._q.push([CALL, fn]);
}

