var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('test', { title: 'Express', msg:'World', IP:process.env.SERVER_HOST });
});

module.exports = router;
