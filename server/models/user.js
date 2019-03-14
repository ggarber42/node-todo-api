const mongoose = require('mongoose');

var User = mongoose.model('User',{ //Objeto Todo
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {User};

// var newUser = new User({
//     email: '    ggarber3@gmail.com'
// })

// newUser
//     .save()
//     .then((doc)=>{
//         console.log(JSON.stringify(doc, undefined, 2));
//     },err => {
//         console.log('Unable to save Todo');
//     })