# dom-q

`dom-q` is a simple queue for batch execution of DOM mutation operations. Each queue instance exposes an interface to standard DOM operations (i.e. `setAttribute`, `appendChild`, `insertBefore` etc). Behind the scenes, sequences of operations are recorded and batch-applied at a later time, scheduled with `requestAnimationFrame()` where available.

## Installation

## npm/browserify

Get it:

    npm install --save dom-q

Require it:

    var domq = require('dom-q');

## UMD

Copy and paste either `build/dom-q.js` or `build/dom-q.min.js` into your project.

## API

#### `var q = domq()`

Create a new queue.

Once you've made a queue the following operations are available:

#### `q.setAttribute(el, attribute, value)`

#### `q.removeAttribute(el, attribute)`

#### `q.addClass(el, classNames)`

`classNames` may contain multiple, space-separated class names.

#### `q.removeClass(el, classNames)`

`classNames` may contain multiple, space-separated class names.

#### `q.toggleClass(el, classNames)`

`classNames` may contain multiple, space-separated class names.

#### `q.appendChild(parentNode, childNode)`

#### `q.insertBefore(parentNode, newNode, referenceNode)`

#### `q.insertNodeBefore(referenceNode, newNode)`

Convenience method; equivalent to `q.insertBefore(referenceNode.parentNode, newNode, referenceNode)`.

#### `q.insertAfter(parentNode, newNode, referenceAfter)`

#### `q.insertNodeAfter(referenceNode, newNode)`

Convenience method; equivalent to `q.insertAfter(referenceNode.parentNode, newNode, referenceNode)`.

#### `q.removeChild(parentNode, childNode)`

#### `q.removeNode(childNode)`

Convenience method; equivalent to `q.removeChild(childNode.parentNode, childNode)`.

#### `q.replaceChild(parentNode, newChild, oldChild)`

#### `q.replaceNode(childNode, replacementNode)`

Convenience method; equivalent to `q.replaceChild(childNode.parentNode, replacementNode, childNode)`.

#### `q.setText(el, textContent)`

#### `q.setHTML(el, htmlContent)`

#### `q.call(fn)`

Insert an arbitrary function into the queue; will be called in the course of normal queue processing.

## Copyright &amp; License

&copy; 2014 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.