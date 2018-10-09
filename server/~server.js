var mongoose = require('mongoose');//uvozimo paket mongoose za rad sa mongoDB bazom
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');//povezivanje sa bazom

//schema tj model za collection Todo
var Todo = mongoose.model('Todo', {
  text: {
  	type: String,
  	required: true,
  	minlength: 1,
  	trim: true
  },
  completed: {
  	type: Boolean,
  	default: false
  },
  completed_at: {
  	type: Number,
  	default: null
  }	
});

//pravimo novi Todo, tj podesavamo mu property-e
// var newTodo = new Todo({
//   text: 'Uci NodeJS'	
// });

// //cuvamo napravljeni Todo u bazi tj upisujemo ga u Todo tabelu
// newTodo.save()
//   .then((doc) => {
//   	console.log('Saved Todo', doc);
//   },(e) => {
//   	console.log('Unable to save Todo');
//   });
//jos jedan Todo i cuvamo ga
// var otherTodo = new Todo({
//   text: 'Narani Macku',
//   completed: true,
//   completed_at: 123	
// });
//jos jedan Todo i cuvamo ga
// var otherTodo = new Todo({
//   text: 'Bla bla Todo'	
// });

// otherTodo.save()
//   .then((doc) => {
//   	console.log(JSON.stringify(doc, undefined, 2));
//   }, (e) => {
//   	console.log('Unable to save Todo', e);
//   })



//Novi model za User collection
var User = mongoose.model('User', {
  email: {
  	type: String,
  	required: true,
  	trim: true,
  	minlength: 1
  }
});

var user = new User({email: 'simasimic@hotmail.com    '});

user.save()
  .then((doc) => {
    console.log('User saved', doc);
  }, (e) => {
  	console.log('Unable to save user', e);
  })

