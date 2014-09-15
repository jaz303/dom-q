var ops = require('./ops');

exports.ln = ln;
function ln(line) {
	if (Array.isArray(line)) {
		line.forEach(ln);
	} else {
		process.stdout.write(line + "\n");	
	}
}

exports.gendomutil = function() {
	ln("var du = require('domutil');");

	var domutil = {};

	for (var k in ops) {
		if (ops[k].du) {
			for (var exp in ops[k].du) {
				domutil[exp] = ops[k].du[exp];
			}
		}
	}

	for (var k in domutil) {
		ln("var " + domutil[k] + " = du." + k + ";");
	}

	ln("");
}