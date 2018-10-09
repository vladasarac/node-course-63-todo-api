const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');//uvozimo mongoose variablu iz fajla /server/db/mongoose.js tj vezu sa bazom
const {Todo} = require('./../server/models/todo');//uvozimo model Todo u variablu Todo iz fajla server/models/todo.js
const {User} = require('./../server/models/user');//uvozimo model Todo u variablu Todo iz fajla server/models/todo.js

// var id = '5bbc9d9bf113c5705741a811';
// var id = '5bbc9d9bf113c5705741a844dsdsdsds';//nepostojeci _id i nevalidan _id
//proveravamo da li je _id validan
// if(!ObjectID.isValid(id)){
//   console.log('ID not Valid');
// };

//mongoose-ov find() metod(vraca array objekata)
// Todo.find({ 
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });

// //mongoose-ov findOne() metod(vraca objekat)
// Todo.findOne({ 
//   _id: id	
// }).then((todo) => {
//   console.log('Todo: ', todo);
// });

//mongoose-ov findById() (samo mu se ubaci id kao argument) metod(vraca objekat)
// Todo.findById(id)
//   .then((todo) => {
//   	if(!todo){
//   	  return console.log('Id not found.');	
//   	}
//     console.log('TodoById: ', todo);
//   })
//   .catch((e) => console.log(e));

//Rad sa User-om
User.findById('5bbc7116d995c80d4ef71abb')
  .then((user) => {
  	if(!user){
  	  return console.log('Unable to find user');	
  	}
  	console.log('User: ', user);
  }, (e) => {
  	console.log(e);
  });












