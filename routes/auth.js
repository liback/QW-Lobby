var express = require('express');
var router = express.Router();
var passport = require('passport');


// Login page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', message: req.flash('loginMessage') });
});

// Login request handling
router.post('/login', passport.authenticate('local-login', {
    successRedirect:    '/lobby/',
    failureRedirect:    '/auth/login/',
    failureFlash:       true
}));

// Signup page
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up', message: req.flash('signupMessage') });
});

// Signup request handling
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect:    '/auth/success',
    failureRedirect:    '/auth/signup',
    failureFlash:       true
}));

// Displays success message after signup
router.get('/success', function(req, res, next) {
  res.render('auth/success', { title: 'Successfully signed up' });
});



module.exports = router;
