var express = require('express');
var router = express.Router();

// Main page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chat' });
});

// User profile
// TODO: Point out specific user
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

module.exports = router;
