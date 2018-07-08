var express = require('express');
var router = express.Router();
var User     = require('../models/users').User;
var ObjectID = require('mongodb').ObjectID;



/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function (err, users) {
      if (err) throw err;
      res.json(users);
  });
});

router.get('/:id', function(req, res, next) {
    try {
        var id = new ObjectID(req.params.id);
    } catch (e) {
        res.redirect('/404');
        // res.send('wtf');
        return;
    }

    User.findById(id, function (err, user) {
        if (err) return next(err);

        if (!user) {
            res.redirect('/404');
        } else {
            res.json(user);
        }
    });
});

module.exports = router;
