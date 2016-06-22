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
}),
function (req, res) {
    console.log('Setting cookies...');
    
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
        req.session.cookie.expires = false;
    }
    
    res.redirect('/');
});

// Logout request handling
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

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
