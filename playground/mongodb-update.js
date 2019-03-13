const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err,client) => {
    if(err) return console.log('Unable to connect to MongoDb Server');
    console.log('Connected to Mongo Db Server');
    /*-----*/
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectId('5c86f5ac92c5cd650be734da')
    },{
        $inc:{
            time: 2
        }
    },{
        returnOriginal: false
    }).then(result => console.log(result));

    // client.close();
});