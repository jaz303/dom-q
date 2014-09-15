var ops = require('./ops');
var util = require('./util');

var ln = util.ln;

util.gendomutil();

//
// Preamble

ln([
	"var rafq = require('raf-q');",
	"",
	"module.exports = Queue;",
	"function Queue() {",
	"    this._q = rafq(apply);",
	"}",
	""
]);

//
// Generate constants

var nextId = 1;

for (var k in ops) {
	var op = ops[k];
	ln("var " + op.id + " = " + (nextId++) + ";");
}

ln("");

//
// Generate application

ln("function apply(op) {");
ln("    switch(op[0]) {");

function code(op) {
	return op.impl.replace(/\{\{(\w+)\}\}/g, function(str, varname) {
		return "op[" + (op.args.indexOf(varname) + 1) + "]";
	});
}

for (var k in ops) {
	var op = ops[k];

	ln("        case " + op.id + ":");
	ln("            " + code(op));
	ln("            break;")
}

ln("    }");
ln("}");

ln("");

//
// Generate queue interface

for (var k in ops) {
	var op = ops[k];
	var args = op.args;
	var ary = [op.id].concat(args);
	ln("Queue.prototype." + k + " = function(" + (args.join(', ')) + ") {");
	ln("    this._q.push([" + ary.join(', ') + "]);");
	ln("}");
	ln("");
}