const {SHA256} = require('crypto-js'); 
const jwt = require('jsonwebtoken'); // u var jwt uvozimo paket jsonwebtoken za pravljenje tokena 

var data = {
  id: 10	
};

var token = jwt.sign(data, '123abc');//pravi se token od data objekta i salta '123abc'
console.log(token);

var decoded = jwt.verify(token, '123abc');//provera da li je token menjan
console.log('decoded: ', decoded);



// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()	
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//   console.log('Data was not changed.');
// }else{
//   console.log('Data was change. Do not trust!');	
// }


