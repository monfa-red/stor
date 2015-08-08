var express = require('express');
var router = express.Router();

// connect to mongodb
var mongoose = require("mongoose");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stor' });
});

//test
// router.get('/add/:name', function(req, res, next) {
// 	new Person({
// 		firstName: req.params.name,
// 		lastName: "monfared",
// 		email: "a@monfa.red"
// 	})
// 	.save(function(err, msg) {
// 		res.send(msg)
// 	})
// })

module.exports = router;
