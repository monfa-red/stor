var express = require('express');
var router = express.Router();

// connect to mongodb
var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/chat');


// Schema
// var personSchema = {
//   firstName: String,
//   lastName: String,
//   email: String
// }

// var Person = mongoose.model('person', personSchema, 'people');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Person.find(function (err, doc) {
  //   res.send(doc);
  // })
  res.render('index', { title: 'Angular 2!' });
});
router.get('/register', function(req, res, next) {
  // Person.find(function (err, doc) {
  //   res.send(doc);
  // })
  res.render('index', { title: 'Angular 2!' });
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
