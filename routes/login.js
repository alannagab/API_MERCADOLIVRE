var express = require('express');
var router = express.Router();

/* Acess login page */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;