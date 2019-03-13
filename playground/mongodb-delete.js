const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err,client) => {
    if(err) return console.log('Unable to connect to MongoDb Server');
    console.log('Connected to Mongo Db Server');
    /*-----*/
    // const db = client.db('TodoApp');

    const db = client.db('Users');
    
    //Delete Many
    // db.collection('Todos').deleteMany({text : "Eat lunch"}).then((result)=> console.log(result));
    //Delete One
    // db.collection('Todos').deleteOne({text : "Eat lunch"}).then((result)=> console.log(result));
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed : false}).then((result)=> console.log(result));

    db.collection('Users').deleteMany({name : 'Garber'}).then((result) => console.log(result));

    db.collection('Users').findOneAndDelete({_id : ObjectId("5c884f9dc9695dd7eeed4a7f")}).then((result) => console.log(JSON.stringify(result)));

    // client.close();
});