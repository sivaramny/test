/* Ref:http://underscorejs.org */

//require underscore module
var _ = require('underscore');

//to view the methods in underscore module
//console.log(_);


console.log("each");
console.log("====");
//iterates over a list of elements, yielding each in turn to an iteratee function
_.each([1, 2, 3], console.log);
_.each({one: 1, two: 2, three: 3}, console.log);

console.log("map");
console.log("===");
//Produces a new array of values by mapping each value in list through a transformation function (iteratee)
var res =_.map([1, 2, 3], function(num){ return num * 3; });
console.log(res);


console.log("reduce");
console.log("======");
var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
console.log(sum);

console.log("reduce");
console.log("======");
var list = [[0, 1], [2, 3], [4, 5]];
var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
console.log(flat);

console.log("find");
console.log("====");
//Looks through each value in the list, returning the first one that passes a truth test (predicate), or undefined if no value passes the test.
var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(even);


console.log("filter");
console.log("======");
//Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(evens);


console.log("where");
console.log("=====");
//Looks through each value in the list, returning an array of all the values that contain all of the key-value pairs listed in properties.
var listOfPlays  = [{author: "Shakespeare", year: 1611, title:"The Tempest"}, {author: "Robin Singh", year: 1611, title:"The Tempest"}]
var res = _.where(listOfPlays, {author: "Shakespeare", year: 1611});
console.log(res);

console.log("findWhere");
console.log("=========");
//Looks through the list and returns the first value that matches all of the key-value pairs listed in properties.
var listOfPlays  = [{author: "Shakespeare", year: 1611, title:"The Tempest"}, {author: "Robin Singh", year: 1611, title:"The Tempest"}]
var res = _.findWhere(listOfPlays, {author: "Shakespeare", year: 1611});
console.log(res);


console.log("reject");
console.log("======");
//Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter.
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(odds);