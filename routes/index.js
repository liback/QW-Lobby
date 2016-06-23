var express = require('express');
var router = express.Router();

var mwIsLoggedIn = require('../middleware/isloggedin');

router.get('/', function(req, res, next) {
  res.redirect('/auth/signup');
});


// Main page
router.get('/lobby', mwIsLoggedIn, function(req, res, next) {
  res.render('lobby', { title: 'Lobby' });
});

// User profile
// TODO: Point out specific user
router.get('/profile', mwIsLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

module.exports = router;
