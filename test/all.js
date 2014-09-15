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

test("set style", function(assert, q, el) {
    q.style(el, 'backgroundColor', 'red');
    q.call(function() {
        assert.ok(el.style.backgroundColor === 'red');
        assert.end();
    })
});

test("set styles", function(assert, q, el) {
    q.style(el, {backgroundColor: 'red', color: 'blue'});
    q.call(function() {
        assert.ok(el.style.backgroundColor === 'red');
        assert.ok(el.style.color === 'blue');
        assert.end();
    })
});

test("remove style", function(assert, q, el) {
    el.style.backgroundColor = 'black';
    q.removeStyle(el, 'backgroundColor');
    q.call(function() {
        assert.ok(!el.style.backgroundColor);
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

test("append child", function(assert, q, el) {
    var child = document.createElement('div');
    q.appendChild(el, child);
    q.call(function() {
        assert.ok(el.childNodes.length === 1);
        assert.ok(el.childNodes[0] === child);
        assert.end();
    });
});

test("insert before", function(assert, q, el) {
    var ref = document.createElement('div');
    var other = document.createElement('div');
    el.appendChild(ref);
    q.insertBefore(el, other, ref);
    q.call(function() {
        assert.ok(el.childNodes.length === 2);
        assert.ok(ref.previousSibling === other);
        assert.end();
    });
});

test("insert after", function(assert, q, el) {
    var ref = document.createElement('div');
    var other = document.createElement('div');
    el.appendChild(ref);
    q.insertAfter(el, other, ref);
    q.call(function() {
        assert.ok(el.childNodes.length === 2);
        assert.ok(ref.nextSibling === other);
        assert.end();
    });
});

test("remove child", function(assert, q, el) {
    var child = document.createElement('div');
    el.appendChild(child);
    q.removeChild(el, child);
    q.call(function() {
        assert.ok(el.childNodes.length === 0);
        assert.ok(!child.parentNode);
        assert.end();
    });
});

test("replace child", function(assert, q, el) {
    var child1 = document.createElement('div');
    var child2 = document.createElement('div');
    el.appendChild(child1);
    q.replaceChild(el, child2, child1);
    q.call(function() {
        assert.ok(el.childNodes.length === 1);
        assert.ok(el.childNodes[0] === child2);
        assert.ok(!child1.parentNode);
        assert.end();
    });
});

test("before()", function(assert, q, el) {
    var ref = document.createElement('div');
    var other = document.createElement('div');
    el.appendChild(ref);
    q.before(ref, other);
    q.call(function() {
        assert.ok(el.childNodes.length === 2);
        assert.ok(ref.previousSibling === other);
        assert.end();
    });
});

test("after()", function(assert, q, el) {
    var ref = document.createElement('div');
    var other = document.createElement('div');
    el.appendChild(ref);
    q.after(ref, other);
    q.call(function() {
        assert.ok(el.childNodes.length === 2);
        assert.ok(ref.nextSibling === other);
        assert.end();
    });
});

test("replace()", function(assert, q, el) {
    var child1 = document.createElement('div');
    var child2 = document.createElement('div');
    el.appendChild(child1);
    q.replace(child1, child2);
    q.call(function() {
        assert.ok(el.childNodes.length === 1);
        assert.ok(el.childNodes[0] === child2);
        assert.ok(!child1.parentNode);
        assert.end();
    });
});

test("remove()", function(assert, q, el) {
    var child = document.createElement('div');
    el.appendChild(child);
    q.remove(child);
    q.call(function() {
        assert.ok(el.childNodes.length === 0);
        assert.ok(!child.parentNode);
        assert.end();
    });
});

test("append()", function(assert, q, el) {
    q.append(el, ['foo', document.createElement('div')]);
    q.call(function() {
        assert.ok(el.childNodes.length === 2);
        assert.end();
    });
});

test("clear()", function(assert, q, el) {
    el.innerHTML = "<div><b>foo</b></div>";
    q.clear(el);
    q.call(function() {
        assert.ok(el.innerHTML === "");
        assert.end();
    });
});

test("content()", function(assert, q, el) {
    q.content(el, "<b>boom</b>");
    q.call(function() {
        assert.ok(el.innerHTML === "<b>boom</b>");
        assert.end();
    });
});

test("text()", function(assert, q, el) {
    q.text(el, "everything is awesome");
    q.call(function() {
        assert.ok(el.textContent === "everything is awesome");
        assert.end();
    });
});

test("afterFlush", function(assert, q, el, async) {

    q.appendChild(el, document.createElement('div'));
    q.appendChild(el, document.createElement('div'));
    q.appendChild(el, document.createElement('div'));

    if (async) {
        assert.ok(el.childNodes.length === 0);
    }

    q.afterFlush(function() {
        assert.equal(el.childNodes.length, 3);
        assert.end();
    });

});