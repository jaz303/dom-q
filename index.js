var du = require('domutil');

module.exports = function() {
	return new Queue();
}

var raf = window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame;

raf = raf ? raf.bind(window) : function(fn) { return setTimeout(fn, 16); };

var SET_ATTRIBUTE 		= 1,
	REMOVE_ATTRIBUTE	= 2,
	ADD_CLASS			= 3,
	REMOVE_CLASS		= 4,
	TOGGLE_CLASS		= 5,
	APPEND_CHILD		= 6,
	INSERT_BEFORE		= 7,
	INSERT_AFTER		= 8,
	REMOVE_CHILD		= 9,
	REMOVE_NODE 		= 10,
	REPLACE_CHILD		= 11,
	REPLACE_NODE		= 12,
	SET_TEXT			= 13,
	SET_HTML			= 14,
	CALL 				= 100;

function Queue() {
	this._ops = [];
	this._timer = null;
	this._drainMethod = this._drain.bind(this);
}

Queue.prototype._drain = function() {

	var ary = this._ops;

	for (var i = 0, len = ary.length; i < len; ++i) {
		var op = ary[i];
		switch (op[0]) {
			case SET_ATTRIBUTE:
				op[1].setAttribute(op[2], op[3]);
				break;
			case REMOVE_ATTRIBUTE:
				op[1].removeAttribute(op[2]);
				break;
			case ADD_CLASS:
				du.addClass(op[1], op[2]);
				break;
			case REMOVE_CLASS:
				du.removeClass(op[1], op[2]);
				break;
			case TOGGLE_CLASS:
				du.toggleClass(op[1], op[2]);
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
			case REMOVE_NODE:
				op[1].parentNode.removeChild(op[1]);
				break;
			case REPLACE_CHILD:
				op[1].replaceChild(op[2], op[3]);
				break;
			case REPLACE_NODE:
				op[1].parentNode.replaceChild(op[2], op[1]);
				break;
			case SET_TEXT:
				du.setText(op[1], op[2]);
				break;
			case SET_HTML:
				op[1].innerHTML = op[2];
				break;
			case CALL:
				op[1]();
				break;
		}
	}

	ary.length = 0;
	this._timer = null;

}

Queue.prototype._push = function(op) {
	this._ops.push(op);
	if (!this._timer) {
		this._timer = raf(this._drainMethod);
	}
}

//
// Attributes

Queue.prototype.setAttribute = function(el, attribute, value) {
	this._push([SET_ATTRIBUTE, el, attribute, value]);
}

Queue.prototype.removeAttribute = function(el, attribute) {
	this._push([REMOVE_ATTRIBUTE, el, attribute]);
}

//
// Class

Queue.prototype.addClass = function(el, classNames) {
	this._push([ADD_CLASS, el, classNames]);
}

Queue.prototype.removeClass = function(el, classNames) {
	this._push([REMOVE_CLASS, el, classNames]);
}

Queue.prototype.toggleClass = function(el, classNames) {
	this._push([TOGGLE_CLASS, el, classNames]);
}

//
// Hierarchy

Queue.prototype.appendChild = function(parentNode, childNode) {
	this._push([APPEND_CHILD, parentNode, childNode]);
}

Queue.prototype.insertBefore = function(parentNode, newElement, referenceElement) {
	this._push([INSERT_BEFORE, parentNode, newElement, referenceElement]);
}

Queue.prototype.insertAfter = function(parentNode, newElement, referenceElement) {
	this._push([INSERT_AFTER, parentNode, newElement, referenceElement]);
}

Queue.prototype.removeChild = function(parentNode, childNode) {
	this._push([REMOVE_CHILD, parentNode, childNode]);
}

Queue.prototype.removeNode = function(childNode) {
	this._push([REMOVE_NODE, childNode]);
}

Queue.prototype.replaceChild = function(parentNode, newChild, oldChild) {
	this._push([REPLACE_CHILD, parentNode, newChild, oldChild]);
}

Queue.prototype.replaceNode = function(childNode, replacementNode) {
	this._push([REPLACE_NODE, childNode, replacementNode]);
}

//
// Content

Queue.prototype.setText = function(el, textContent) {
	this._push([SET_TEXT, el, textContent]);
}

Queue.prototype.setHTML = function(el, htmlContent) {
	this._push([SET_HTML, el, htmlContent]);
}

//
// Call

Queue.prototype.call = function(fn) {
	this._push([CALL, fn]);
}