var mongoose = require('../../libs/mongoose');
var User     = require('../users').User;

var user = new User({
    username: "Tester8",
    password: "secret"
});

user.save(function(err, user, affected) {
    if (err) throw err;

    User.findOne({username: "Tester8"}, function(err, tester) {
        if (err) throw err;

        console.log(tester);

        mongoose.disconnect();
    });
});
