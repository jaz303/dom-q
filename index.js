var AsyncQueue = require('./async');
var SyncQueue = require('./sync');

exports.batch = function() {
    return new AsyncQueue();
}

exports.immediate = function() {
    return new SyncQueue();
}
