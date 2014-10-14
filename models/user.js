var mongoose;

mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/test_db");
console.log("db connected");
var Schema = mongoose.Schema;
var userSchema = Schema({
  name    : String,
  age     : Number
});


var User = mongoose.model('User', userSchema);
var objP1 = new User({name:"Siva", age:25});

objP1.save(function(err){console.log(err);});
