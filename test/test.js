var test = require('tape');
var domq = require('..');

module.exports = function(name, cb) {
	test(name, function(assert) {
		var el = document.createElement('div');
		var q = domq();
		cb(assert, q, el);
	});
}