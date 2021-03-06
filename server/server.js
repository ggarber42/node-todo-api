require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb')
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo
     .save()
     .then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req,res) => {
    Todo
        .find()
        .then((todos) => {
            res.send({todos});
        }, (err) => {
            res.status(400).send(err);
        });
});

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }        
    Todo
        .findById(id)
        .then((todo) => {
            if(!todo) {
                res.status(404).send();        
            }                
            res.send({todo});
        }, (err) => {
            res.status(400).send();
        });        
});

app.delete('/todos/:id', (req,res) =>{
    var id = req.params.id;
    // if(!id) {
    //     Todo
    //         .remove({})
    //         .then((res) =>{
    //             res.status(200).send('All todos deleted');
    //         }, (err) => {
    //             res.status(400).send();
    //         });
    // } else {
    //     if(!ObjectID.isValid(id)){
    //         res.status(404).send();
    //     } 
    //     Todo
    //         .findByIdAndRemove(id)
    //         .then((res) => {
    //             res.status(200).send(`Todo _id:${id} deleted`);
    //         }, (err) => {
    //             res.status(400).send();
    //         });
    // }
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    } 
    Todo.findByIdAndRemove(id).then((todo) =>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);        
    }).catch((e) => {
        res.status(400).send();
    });
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body ,['text','completed']);
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    } 
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {    
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => res.status(400).send())
});

app.post('/users', (req,res) =>{
    var body = _.pick(req.body ,['email','password']);
    var user = new User(body);
    
    user
     .save()
     .then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/users/me', authenticate ,(req,res) => {
     res.send(req.user);
});

app.listen(port, () => console.log(`started on port ${port}`));

module.exports = {app};