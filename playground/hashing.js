const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken'); // usa essa no app. que usa a de cima

var message = 'Gaby Schuck';
var hash =  SHA256(message).toString();

var data = {
    id: 10
}

var token = jwt.sign(data, '123');
console.log(token);

var decoded = jwt.verify(token,'123');
console.log('decoded',decoded);

// console.log(`Message ${message}`);
// console.log(`Hash ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString() // colocar somesecret é dar salt no hash
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('sucesso');
// } else {
//     console.log('errou');
// }