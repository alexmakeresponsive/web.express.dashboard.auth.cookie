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

/* GET login page. */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    async.waterfall(
        [
            function (cb) {
                User.findOne({ username: username }, cb);
            },
            function (user, cb) {
                if (user) {
                    if (user.checkPassword(password)) {
                        cd(null, user)
                    } else {
                        next(403);
                    }
                } else {
                    var userNew = new User({ username: username, password: password });
                    userNew.save(function (err) {
                        if (err) return next(err);
                        cb(null, userNew);
                    });
                }
            }
        ]
        ,function (err, user) {
            if (err) return next(err);
            req.session.user = user._id;
            res.send({});
        }
    )
});

module.exports = router;
