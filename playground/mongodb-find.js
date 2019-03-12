const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err,client) => {
    if(err) return console.log('Unable to connect to MongoDb Server');
    console.log('Connected to Mongo Db Server');
    /*-----*/
    const db = client.db('TodoApp');
    db.collection('Todos').find({completed: true}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fecth todos', err);
    });
    // client.close();
});