var async = require('async');
var mongoose = require('../../libs/mongoose');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err) {
    // console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('../users');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    var users = [
        {username: 'Вася', password: 'supervasya'},
        {username: 'Петя', password: '123'},
        {username: 'admin', password: 'thetruehero'}
    ];

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}
