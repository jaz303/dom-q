var ops = require('./ops');
var util = require('./util');

var ln = util.ln;

util.gendomutil();

//
// Preamble

ln([
	"module.exports = Queue;",
	"function Queue() {",
	"}",
	""
]);

//
// Generate queue interface

function code(op) {
	return op.impl.replace(/\{\{(\w+)\}\}/g, function(match, varname) {
		return varname;
	});
}

for (var k in ops) {
	var op = ops[k];
	var args = op.args;
	var ary = [op.id].concat(args);
	ln("Queue.prototype." + k + " = function(" + (args.join(', ')) + ") {");
	ln("    " + code(op));
	ln("}");
	ln("");
}
