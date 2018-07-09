var express = require('express');
var router = express.Router();
var authCheck = require('../middleware/authCheck');

/* GET profile page. */
router.get('/', authCheck, function(req, res, next) {
  res.render('profile', {
    title: 'Profile page',
    titleHead: 'Profile page'
  });
});

module.exports = router;
