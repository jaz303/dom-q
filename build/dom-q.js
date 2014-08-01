!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.domq=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var du = require('domutil');
var rafq = require('raf-q');

exports.batch = function() { return new Queue(rafq(apply)); }
exports.immediate = function() { return new Queue({push: apply}); }

function Queue(impl) {
    this._q = impl;
}

var SET_ATTRIBUTE       = 1,
    REMOVE_ATTRIBUTE    = 2,
    ADD_CLASS           = 3,
    REMOVE_CLASS        = 4,
    TOGGLE_CLASS        = 5,
    APPEND_CHILD        = 6,
    INSERT_BEFORE       = 7,
    INSERT_NODE_BEFORE  = 8,
    INSERT_AFTER        = 9,
    INSERT_NODE_AFTER   = 10,
    REMOVE_CHILD        = 11,
    REMOVE_NODE         = 12,
    REPLACE_CHILD       = 13,
    REPLACE_NODE        = 14,
    SET_TEXT            = 15,
    SET_HTML            = 16,
    CALL                = 100;

function apply(op) {
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
        case INSERT_NODE_BEFORE:
            op[1].parentNode.insertBefore(op[2], op[1]);
            break;
        case INSERT_AFTER:
            op[1].insertBefore(op[2], op[3].nextSibling);
            break;
        case INSERT_NODE_AFTER:
            op[1].parentNode.insertBefore(op[2], op[1].nextSibling);
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

//
// Attributes

Queue.prototype.setAttribute = function(el, attribute, value) {
    this._q.push([SET_ATTRIBUTE, el, attribute, value]);
}

Queue.prototype.removeAttribute = function(el, attribute) {
    this._q.push([REMOVE_ATTRIBUTE, el, attribute]);
}

//
// Class

Queue.prototype.addClass = function(el, classNames) {
    this._q.push([ADD_CLASS, el, classNames]);
}

Queue.prototype.removeClass = function(el, classNames) {
    this._q.push([REMOVE_CLASS, el, classNames]);
}

Queue.prototype.toggleClass = function(el, classNames) {
    this._q.push([TOGGLE_CLASS, el, classNames]);
}

//
// Hierarchy

Queue.prototype.appendChild = function(parentNode, childNode) {
    this._q.push([APPEND_CHILD, parentNode, childNode]);
}

Queue.prototype.insertBefore = function(parentNode, newNode, referenceNode) {
    this._q.push([INSERT_BEFORE, parentNode, newNode, referenceNode]);
}

Queue.prototype.insertNodeBefore = function(referenceNode, newNode) {
    this._q.push([INSERT_NODE_BEFORE, referenceNode, newNode]);
}

Queue.prototype.insertAfter = function(parentNode, newNode, referenceNode) {
    this._q.push([INSERT_AFTER, parentNode, newNode, referenceNode]);
}

Queue.prototype.insertNodeAfter = function(referenceNode, newNode) {
    this._q.push([INSERT_NODE_AFTER, referenceNode, newNode]);
}

Queue.prototype.removeChild = function(parentNode, childNode) {
    this._q.push([REMOVE_CHILD, parentNode, childNode]);
}

Queue.prototype.removeNode = function(childNode) {
    this._q.push([REMOVE_NODE, childNode]);
}

Queue.prototype.replaceChild = function(parentNode, newChild, oldChild) {
    this._q.push([REPLACE_CHILD, parentNode, newChild, oldChild]);
}

Queue.prototype.replaceNode = function(childNode, replacementNode) {
    this._q.push([REPLACE_NODE, childNode, replacementNode]);
}

//
// Content

Queue.prototype.setText = function(el, textContent) {
    this._q.push([SET_TEXT, el, textContent]);
}

Queue.prototype.setHTML = function(el, htmlContent) {
    this._q.push([SET_HTML, el, htmlContent]);
}

//
// Call

Queue.prototype.call = function(fn) {
    this._q.push([CALL, fn]);
}
},{"domutil":9,"raf-q":10}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
},{"./matches_selector":5}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
exports.isElement = function(el) {
	return el && el.nodeType === 1;
}

exports.replace = function(oldEl, newEl) {
	oldEl.parentNode.replaceChild(newEl, oldEl);
}
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
// http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
exports.viewportSize = function() {
	return {
	    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
	    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	};
}
},{}],9:[function(require,module,exports){
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

},{"./impl/classes":2,"./impl/events":3,"./impl/layout":4,"./impl/matches_selector":5,"./impl/node":6,"./impl/text":7,"./impl/viewport":8}],10:[function(require,module,exports){
module.exports = function(exec) {
    return new Queue(exec);
}

var raf = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame;

raf = raf ? raf.bind(window) : function(fn) { return setTimeout(fm, 16); };

function Queue(exec) {
    this._ops = [];
    this._timer = null;
    this._drainMethod = this._drain.bind(this);
    this._exec = exec;
}

Queue.prototype._drain = function() {
    var ary = this._ops;
    for (var i = 0, len = ary.length; i < len; ++i) {
        this._exec(ary[i]);
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
},{}]},{},[1])(1)
});