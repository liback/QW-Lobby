var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});

module.exports = router;
