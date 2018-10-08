const MongoClient = require('mongodb').MongoClient;

//objec destructuring
// var user = {name: 'vlada', age: 36};
// var {name} = user;//pravimo variablu name cija je vrednost property name objekta user
// console.log(name); 

//conecting to TodoApp database and inserting row into Todos collection
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){ return console.log('Unable to connect to MongoDB server'); }
  console.log('Connected to MongoDB server');
  //insert data to Todos collection
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false		
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);	
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //insert data to Users collection
  db.collection('Users').insertOne({
  	name: 'Janko',
  	age: 29,
  	location: 'Mala Krsna'
  }, (err, result) => {
  	if(err){
  	  return console.log('Unable to insert user', err);	
  	}
  	//izvlacenje timestamp-a iz _id polja
  	console.log(result.ops[0]._id.getTimestamp());
  });

  db.close();
});




