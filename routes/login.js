var express = require('express');
var router = express.Router();
var User = require('../models/users').User;
var async = require('async');



/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Login page',
    titleHead: 'Login page',
  });
});

/* POST login page. */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err === 403) {
                return next(403, 'Wrong username or password');
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    });
});

module.exports = router;
