var express = require('express');
var router = express.Router();

var mw_isLoggedIn = require('../middleware/isloggedin');

router.get('/', function(req, res, next) {
  res.redirect('/auth/signup');
});


// Main page
router.get('/lobby', function(req, res, next) {
  res.render('lobby', { title: 'Chat' });
});

// User profile
// TODO: Point out specific user
router.get('/profile', mw_isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile', user: req.user });
});

module.exports = router;
