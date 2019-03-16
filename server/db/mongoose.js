const mongoose = require('mongoose');
const db = require('.././config/keys').mongoURI;
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/TodoApp');

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



module.exports = {mongoose};