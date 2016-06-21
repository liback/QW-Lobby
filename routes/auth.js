var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up', message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect:    '/profile',
    failureRedirect:    '/signup',
    failureFlash:       true
}));

module.exports = router;
