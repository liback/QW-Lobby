var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up', message: req.flash('signupMessage') });
});

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
