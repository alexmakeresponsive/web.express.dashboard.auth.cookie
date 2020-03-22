var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET 404 page. */
router.get('/', function(req, res, next) {
    next(createError(404));
});

module.exports = router;
