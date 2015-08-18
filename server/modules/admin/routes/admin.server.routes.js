var express = require('express');
var router = express.Router();

require('../models/admin.server.model');
var users = require('../controllers/admin.server.controller');


router.route('/')
  .get(users.list)
  .post(users.create)


module.exports = router;
