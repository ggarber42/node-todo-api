const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User',{ //Objeto Todo
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        } 
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [
        {
            acess: {
                type: String,
                require: true
            },
            token: {
                type: String,
                require: true
            }
        }
    ]
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