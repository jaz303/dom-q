var test = require('./test');

test("set attribute", function(assert, q, el) {
	q.setAttribute(el, "foo", "bar");
	q.call(function() {
		assert.equal(el.getAttribute("foo"), "bar");
		assert.end();
	});
});

test("remove attribute", function(assert, q, el) {
	el.setAttribute('foo', 'baz');
	q.removeAttribute(el, 'foo');
	q.call(function() {
		assert.ok(el.getAttribute("foo") === null);
		assert.end();
	});
});

test("add class", function(assert, q, el) {
	el.className = 'leopard'
	q.addClass(el, 'bleem');
	q.call(function() {
		assert.ok(el.className === 'leopard bleem');
		assert.end();
	});
});

test("remove class", function(assert, q, el) {
	el.className = 'dorothy tinman';
	q.removeClass(el, 'dorothy');
	q.call(function() {
		assert.ok(el.className === 'tinman');
		assert.end();
	});
});

test("toggle class", function(assert, q, el) {
	el.className = 'sky';
	q.toggleClass(el, 'sky fairy');
	q.call(function() {
		assert.ok(el.className === 'fairy');
		assert.end();
	});
});



test("set text", function(assert, q, el) {
	q.setText(el, "everything is awesome");
	q.call(function() {
		assert.ok(el.textContent === "everything is awesome");
		assert.end();
	});
});

test("set HTML", function(assert, q, el) {
	q.setHTML(el, "<b>HELLO</b>");
	q.call(function() {
		assert.ok(el.innerHTML === "<b>HELLO</b>");
		assert.end();
	});
});