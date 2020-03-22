const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test-cats');

var kittySchema = mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
};

const Cat = mongoose.model('Cat', kittySchema);

const kitty = new Cat({ name: 'Zildjian' });
      // kitty.save().then(() => console.log('meow'));

kitty.save(function (err, kitty) {
    if (err) return console.error(err);
});
