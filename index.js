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
	SET_HTML			= 14;

function Queue() {
	this._ops = [];
	this._timer = null;
	this._drainMethod = this._drain.bind(this);
}

Queue.prototype._drain = function() {

	var ary = this._ops;

	for (var i = 0, len = ary.length; i < len; ++i) {
		switch (ary[i]) {
			case SET_ATTRIBUTE:
				ary[1].setAttribute(ary[2], ary[3]);
				break;
			case REMOVE_ATTRIBUTE:
				ary[1].removeAttribute(ary[2]);
				break;
			case ADD_CLASS:
				du.addClass(ary[1], ary[2]);
				break;
			case REMOVE_CLASS:
				du.removeClass(ary[1], ary[2]);
				break;
			case TOGGLE_CLASS:
				du.toggleClass(ary[1], ary[2]);
				break;
			case APPEND_CHILD:
				ary[1].appendChild(ary[2]);
				break;
			case INSERT_BEFORE:
				ary[1].insertBefore(ary[2], ary[3]);
				break;
			case INSERT_AFTER:
				break;
			case REMOVE_CHILD:
				ary[1].removeChild(ary[2]);
				break;
			case REMOVE_NODE:
				ary[1].parentNode.removeChild(ary[1]);
				break;
			case REPLACE_CHILD:
				ary[1].replaceChild(ary[2], ary[3]);
				break;
			case REPLACE_NODE:
				ary[1].parentNode.replaceChild(ary[2], ary[1]);
				break;
			case SET_TEXT:
				du.setText(ary[1], ary[2]);
				break;
			case SET_HTML:
				ary[1].innerHTML = ary[2];
				break;
		}
	}

	ary.splice(0, ary.length);
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
	this._ops.push([SET_ATTRIBUTE, el, attribute, value]);
}

Queue.prototype.removeAttribute = function(el, attribute) {
	this._ops.push([REMOVE_ATTRIBUTE, el, attribute]);
}

//
// Class

Queue.prototype.addClass = function(el, classNames) {
	this._ops.push([ADD_CLASS, el, classNames]);
}

Queue.prototype.removeClass = function(el, classNames) {
	this._ops.push([REMOVE_CLASS, el, classNames]);
}

Queue.prototype.toggleClass = function(el, classNames) {
	this._ops.push([TOGGLE_CLASS, el, classNames]);
}

//
// Hierarchy

Queue.prototype.appendChild = function(parentNode, childNode) {
	this._ops.push([APPEND_CHILD, parentNode, childNode]);
}

Queue.prototype.insertBefore = function(parentNode, newElement, referenceElement) {
	this._ops.push([INSERT_BEFORE, parentNode, newElement, referenceElement]);
}

Queue.prototype.insertAfter = function(parentNode, newElement, referenceElement) {
	this._ops.push([INSERT_AFTER, parentNode, newElement, referenceElement]);
}

Queue.prototype.removeChild = function(parentNode, childNode) {
	this._ops.push([REMOVE_CHILD, parentNode, childNode]);
}

Queue.prototype.removeNode = function(childNode) {
	this._ops.push([REMOVE_NODE, childNode]);
}

Queue.prototype.replaceChild = function(parentNode, newChild, oldChild) {
	this._ops.push([REPLACE_CHILD, parentNode, newChild, oldChild]);
}

Queue.prototype.replaceNode = function(childNode, replacementNode) {
	this._ops.push([REPLACE_NODE, childNode, replacementNode]);
}

//
// Content

Queue.prototype.setText = function(el, textContent) {
	this._ops.push([SET_TEXT, el, textContent]);
}

Queue.prototype.setHTML = function(el, htmlContent) {
	this._ops.push([SET_HTML, el, htmlContent]);
}
