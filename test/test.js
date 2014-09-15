var test = require('tape');
var domq = require('..');

module.exports = function(name, cb) {
    
    test(name + " - async", function(assert) {
        var el = document.createElement('div');
        var q = domq.batch();
        cb(assert, q, el, true);
    });

    test(name + " - sync", function(assert) {
    	var el = document.createElement('div');
        var q = domq.immediate();
        cb(assert, q, el, false);
    });

}