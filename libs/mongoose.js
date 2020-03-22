const mongoose  = require('mongoose');
const config    = require('../bin/config.json').mongoose;

mongoose.connect( config.uri, {
    useNewUrlParser: true
});


module.exports = mongoose;