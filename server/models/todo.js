const mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{ //Objeto Todo
    text: {
        type: String,
        required: true,
        minlength: 1
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});

module.exports = {Todo};

// var newNewTodo = new Todo({
//     text: 'Clean Kitchen',
//     completed: true,
//     completedAt: 500
// });

// newNewTodo.save().then((doc) =>{
//     // console.log('Saved todo', doc);
//     console.log(JSON.stringify(doc,undefined, 2));
// }, e => {
//     console.log('Unable to save Todo');
// });
