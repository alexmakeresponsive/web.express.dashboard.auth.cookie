const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';


// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if (err) throw err;

    console.log("Connected successfully to server");

    const db = client.db('express-auth');

    insertDocuments(db, function() {
        client.close();
    });

});




const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}
