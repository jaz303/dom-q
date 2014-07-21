# dom-q

## Installation

## npm/browserify

Get it:

    npm install --save dom-q

Require it:

    var domq = require('dom-q');

## UMD

Copy and paste either `build/dom-q.js` or `build/dom-q.min.js` into your project.

## API

#### `q = domq()`

Create a new queue.

#### `q.setAttribute(el, attribute, value)`

#### `q.removeAttribute(el, attribute)`

#### `q.addClass(el, classNames)`

#### `q.removeClass(el, classNames)`

#### `q.toggleClass(el, classNames)`

#### `q.appendChild(parentNode, childNode)`

#### `q.insertBefore(parentNode, newElement, referenceElement)`

#### `q.insertNodeBefore(referenceElement, newElement)`

#### `q.insertAfter(parentNode, newElement, referenceAfter)`

#### `q.insertNodeAfter(referenceElement, newElement)`

#### `q.removeChild(parentNode, childNode)`

#### `q.removeNode(childNode)`

#### `q.replaceChild(parentNode, newChild, oldChild)`

#### `q.replaceNode(childNode, replacementNode)`

#### `q.setText(el, textContent)`

#### `q.setHTML(el, htmlContent)`

## Copyright &amp; License

&copy; 2014 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.