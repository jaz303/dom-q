!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.domq=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var du = require('domutil');
var style = du.style;
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

var SET_ATTRIBUTE = 1;
var REMOVE_ATTRIBUTE = 2;
var SET_STYLE = 3;
var ADD_CLASS = 4;
var REMOVE_CLASS = 5;
var TOGGLE_CLASS = 6;
var REMOVE_MATCHING_CLASSES = 7;
var APPEND_CHILD = 8;
var INSERT_BEFORE = 9;
var INSERT_AFTER = 10;
var REMOVE_CHILD = 11;
var REPLACE_CHILD = 12;
var BEFORE = 13;
var AFTER = 14;
var REPLACE = 15;
var REMOVE = 16;
var APPEND = 17;
var CLEAR = 18;
var CONTENT = 19;
var SET_TEXT = 20;
var CALL = 21;

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

Queue.prototype.content = function(el, content) {
    this._q.push([CONTENT, el, content]);
}

Queue.prototype.text = function(el, text) {
    this._q.push([SET_TEXT, el, text]);
}

Queue.prototype.call = function(fn) {
    this._q.push([CALL, fn]);
}


},{"domutil":10,"raf-q":11}],2:[function(require,module,exports){
var AsyncQueue = require('./async');
var SyncQueue = require('./sync');

exports.batch = function() {
    return new AsyncQueue();
}

exports.immediate = function() {
    return new SyncQueue();
}

},{"./async":1,"./sync":12}],3:[function(require,module,exports){
if (typeof window.DOMTokenList === 'undefined') {

	// Constants from jQuery
	var rclass = /[\t\r\n]/g;
	var core_rnotwhite = /\S+/g;

	// from jQuery
	exports.hasClass = function(ele, className) {
	    className = " " + className + " ";
	    return (" " + ele.className + " ").replace(rclass, " ").indexOf(className) >= 0;
	}

	exports.addClass = function(ele, value) {
	    var classes = (value || "").match(core_rnotwhite) || [],
	            cur = ele.className ? (" " + ele.className + " ").replace(rclass, " ") : " ";

	    if (cur) {
	        var j = 0, clazz;
	        while ((clazz = classes[j++])) {
	            if (cur.indexOf(" " + clazz + " ") < 0) {
	                cur += clazz + " ";
	            }
	        }
	        ele.className = cur.trim();
	    }
	}

	exports.removeClass = function(ele, value) {
	    var classes = (value || "").match(core_rnotwhite) || [],
	            cur = ele.className ? (" " + ele.className + " ").replace(rclass, " ") : " ";

	    if (cur) {
	        var j = 0, clazz;
	        while ((clazz = classes[j++])) {
	            while (cur.indexOf(" " + clazz + " ") >= 0) {
	                cur = cur.replace(" " + clazz + " ", " ");
	            }
	            ele.className = value ? cur.trim() : "";
	        }
	    }
	}

	exports.toggleClass = function(ele, value) {
	    var classes = (value || "").match(core_rnotwhite) || [],
	            cur = ele.className ? (" " + ele.className + " ").replace(rclass, " ") : " ";

	    if (cur) {
	        var j = 0, clazz;
	        while ((clazz = classes[j++])) {
	            var removeCount = 0;
	            while (cur.indexOf(" " + clazz + " ") >= 0) {
	                cur = cur.replace(" " + clazz + " ", " ");
	                removeCount++;
	            }
	            if (removeCount === 0) {
	                cur += clazz + " ";
	            }
	            ele.className = cur.trim();
	        }
	    }
	}

} else {

	exports.hasClass = function(el, className) {
	    return el.classList.contains(className);
	}

	exports.addClass = function(el, classes) {
	    if (classes.indexOf(' ') >= 0) {
	        classes.split(/\s+/).forEach(function(c) {
	            el.classList.add(c);
	        });
	    } else {
	        el.classList.add(classes);
	    }
	}

	exports.removeClass = function(el, classes) {
	    if (classes.indexOf(' ') >= 0) {
	        classes.split(/\s+/).forEach(function(c) {
	            el.classList.remove(c);
	        });
	    } else {
	        el.classList.remove(classes);
	    }
	}

	exports.toggleClass = function(el, classes) {
	    if (classes.indexOf(' ') >= 0) {
	        classes.split(/\s+/).forEach(function(c) {
	            el.classList.toggle(c);
	        });
	    } else {
	        el.classList.toggle(classes);
	    }
	}

}

},{}],4:[function(require,module,exports){
var matchesSelector = require('./matches_selector').matchesSelector;

var bind = null, unbind = null;

if (typeof window.addEventListener === 'function') {

	bind = function(el, evtType, cb, useCapture) {
		el.addEventListener(evtType, cb, useCapture || false);
		return cb;
	}

	unbind = function(el, evtType, cb, useCapture) {
		el.removeEventListener(evtType, cb, useCapture || false);
		return cb;
	}

} else if (typeof window.attachEvent === 'function') {

	bind = function(el, evtType, cb, useCapture) {
		
		function handler(evt) {
			evt = evt || window.event;
			
			if (!evt.preventDefault) {
				evt.preventDefault = function() { evt.returnValue = false; }
			}
			
			if (!evt.stopPropagation) {
				evt.stopPropagation = function() { evt.cancelBubble = true; }
			}

			cb.call(el, evt);
		}
		
		el.attachEvent('on' + evtType, handler);
		return handler;
	
	}

	unbind = function(el, evtType, cb, useCapture) {
		el.detachEvent('on' + evtType, cb);
		return cb;
	}

}

function delegate(el, evtType, selector, cb, useCapture) {
	return bind(el, evtType, function(evt) {
		var currTarget = evt.target;
		while (currTarget && currTarget !== el) {
			if (matchesSelector(selector, currTarget)) {
				evt.delegateTarget = currTarget;
				cb.call(el, evt);
				break;
			}
			currTarget = currTarget.parentNode;
		}
	}, useCapture);
}

function bind_c(el, evtType, cb, useCapture) {
	cb = bind(el, evtType, cb, useCapture);

	var removed = false;
	return function() {
		if (removed) return;
		removed = true;
		unbind(el, evtType, cb, useCapture);
		el = cb = null;
	}
}

function delegate_c(el, evtType, selector, cb, useCapture) {
	cb = delegate(el, evtType, selector, cb, useCapture);

	var removed = false;
	return function() {
		if (removed) return;
		removed = true;
		unbind(el, evtType, cb, useCapture);
		el = cb = null;
	}
}

function stop(evt) {
	evt.preventDefault();
	evt.stopPropagation();
}

exports.bind = bind;
exports.unbind = unbind;
exports.delegate = delegate;
exports.bind_c = bind_c;
exports.delegate_c = delegate_c;
exports.stop = stop;
},{"./matches_selector":6}],5:[function(require,module,exports){
exports.setRect = function(el, x, y, width, height) {
	el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.width = width + 'px';
    el.style.height = height + 'px';
}

exports.setPosition = function(el, x, y) {
    el.style.left = x + 'px';
    el.style.top = y + 'px';
}

exports.setSize = function(el, width, height) {
    el.style.width = width + 'px';
    el.style.height = height + 'px';
}
},{}],6:[function(require,module,exports){
var proto = window.Element.prototype;
var nativeMatch = proto.webkitMatchesSelector
					|| proto.mozMatchesSelector
					|| proto.msMatchesSelector
					|| proto.oMatchesSelector;

if (nativeMatch) {
	
	exports.matchesSelector = function(selector, el) {
		return nativeMatch.call(el, selector);
	}

} else {

	console.warn("Warning: using slow matchesSelector()");
	
	var indexOf = Array.prototype.indexOf;
	exports.matchesSelector = function(selector, el) {
		return indexOf.call(document.querySelectorAll(selector), el) >= 0;
	}

}

},{}],7:[function(require,module,exports){
exports.isElement = function(el) {
	return el && el.nodeType === 1;
}

exports.replace = function(oldEl, newEl) {
	oldEl.parentNode.replaceChild(newEl, oldEl);
}
},{}],8:[function(require,module,exports){
if ('textContent' in document.createElement('span')) {
    
    exports.getText = function(el) {
        return el.textContent;
    }

    exports.setText = function(el, text) {
        el.textContent = text;
    }

} else {

    exports.getText = function(el) {
        return el.innerText;
    }

    exports.setText = function(el, text) {
        el.innerText = text;
    }

}
},{}],9:[function(require,module,exports){
// http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
exports.viewportSize = function() {
	return {
	    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
	    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	};
}
},{}],10:[function(require,module,exports){
var du = module.exports = {};

extend(require('./impl/classes'));
extend(require('./impl/events'));
extend(require('./impl/layout'));
extend(require('./impl/matches_selector'));
extend(require('./impl/node'));
extend(require('./impl/text'));
extend(require('./impl/viewport'));

function extend(things) {
    for (var k in things) {
        du[k] = things[k];
    }
}

},{"./impl/classes":3,"./impl/events":4,"./impl/layout":5,"./impl/matches_selector":6,"./impl/node":7,"./impl/text":8,"./impl/viewport":9}],11:[function(require,module,exports){
module.exports = function(exec) {
    return new Queue(exec);
}

var raf = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame;

raf = raf ? raf.bind(window) : function(fn) { return setTimeout(fm, 16); };

function Queue(exec) {
    this._ops = [];
    this._after = [];
    this._timer = null;
    this._drainMethod = this._drain.bind(this);
    this._exec = exec;
}

Queue.prototype._drain = function() {

    var ary, i, len;
    
    ary = this._ops;
    for (i = 0, len = ary.length; i < len; ++i) {
        this._exec(ary[i]);
    }
    ary.length = 0;

    ary = this._after;
    for (i = 0, len = ary.length; i < len; ++i) {
        ary[i]();
    }
    ary.length = 0;

    this._timer = null; 

}

Queue.prototype.push = function(op) {
    this._ops.push(op);
    if (!this._timer) {
        this._timer = raf(this._drainMethod);
    }
}

Queue.prototype.after = function(cb) {
    this._after.push(cb);
    if (!this._timer) {
        this._timer = raf(this._drainMethod);
    }
}
},{}],12:[function(require,module,exports){
var du = require('domutil');
var style = du.style;
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

Queue.prototype.setAttribute = function(el, attr, value) {
    el.setAttribute(attr, value);
}

Queue.prototype.removeAttribute = function(el, attr) {
    el.removeAttribute(attr);
}

Queue.prototype.style = function(el, attribute, value) {
    style(el, attribute, value);
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

Queue.prototype.content = function(el, content) {
    content(el, content);
}

Queue.prototype.text = function(el, text) {
    text(el, text);
}

Queue.prototype.call = function(fn) {
    fn();
}


},{"domutil":10}]},{},[2])(2)
});