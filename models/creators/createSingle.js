var User = require('../users').User;

var user = new User({
    username: "Tester5",
    password: "secret"
});

user.save(function(err, user, affected) {
    if (err) throw err;

    User.findOne({username: "Tester5"}, function(err, tester) {
        if (err) throw err;

        console.log(tester);
    });
});
