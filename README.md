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

#### `var q = domq.batch()`

Create a new queue that batches executes DOM operations using `requestAnimationFrame()`.

See below for the available queue operations.

#### `var q = domq.immediate()`

Create a new "queue" that exposes the same batching API as `domq.batch()`, but instead applies operations synchronously.

See below for the available queue operations.

### Attributes

#### `q.setAttribute(el, attribute, value)`

#### `q.removeAttribute(el, attribute)`

### Style

#### `q.style(el, attribute, value)`

#### `q.style(el, attributes)`

### Classes

#### `q.addClass(el, classes)`

`classes` may contain multiple, space-separated class names.

#### `q.removeClass(el, classes)`

`classes` may contain multiple, space-separated class names.

#### `q.toggleClass(el, classes)`

`classes` may contain multiple, space-separated class names.

### Native DOM interface

#### `q.appendChild(parentNode, childNode)`

#### `q.insertBefore(parentNode, newNode, referenceNode)`

#### `q.insertAfter(parentNode, newNode, referenceAfter)`

#### `q.removeChild(parentNode, childNode)`

#### `q.replaceChild(parentNode, newChild, oldChild)`

### Sugared DOM interface

#### `q.before(referenceNode, newNode)`

Convenience method; equivalent to `q.insertBefore(referenceNode.parentNode, newNode, referenceNode)`.

#### `q.after(referenceNode, newNode)`

Convenience method; equivalent to `q.insertAfter(referenceNode.parentNode, newNode, referenceNode)`.

#### `q.replace(childNode, replacementNode)`

Convenience method; equivalent to `q.replaceChild(childNode.parentNode, replacementNode, childNode)`.

#### `q.remove(childNode)`

Convenience method; equivalent to `q.removeChild(childNode.parentNode, childNode)`.

#### `q.append(el, content)`

Append `content` to `el`. Content can be a DOM node, `DocumentFragment`, HTML/text string, or an array of the above.

#### `q.clear(el)`

Remove all child nodes of `el`.

#### `q.content(el, htmlContent)`

Set `content` of `el` to `htmlContent`. Equivalent to `clear` followed by `append`, and as such accepts the same argument types.

### Text

#### `q.text(el, textContent)`

### Other

#### `q.call(fn)`

Insert an arbitrary function into the queue; will be called in the course of normal queue processing.

#### `q.afterFlush(fn)`

Insert an arbitrary function into the queue; will be called after the next batch of operations has been completely processed. For immediate queues invocation is immediate.

## Copyright &amp; License

&copy; 2014 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.