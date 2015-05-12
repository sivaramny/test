async = require('async');

var documents = ['a', 'b', 'c', 'd', 'e', 'f'];

async.forEachLimit(documents, 2, function(item, callback) {
  console.log(".", item);
  callback(null);
}, function(err){
  console.log("end", err);
});

